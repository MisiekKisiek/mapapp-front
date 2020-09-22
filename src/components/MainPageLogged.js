import React, { Component } from 'react';
import { connect } from 'react-redux';

//Apiprefix
import { API } from '../tools/apiPrefixes';

//Actions
import { getMarkers } from '../actions/markers.action';

//Components
import Header from './HeaderLogged';
import MapComponent from './MapComponent';
import MarkerList from './MarkerList';

class MainPageLogged extends Component {
    constructor(props) {
        super(props)
        this.state = {
            curLat: 52,
            curLng: 21,
            curZoom: 10
        }
    }

    getMarkersAndUpdateCurrentZoom = async (user) => {
        await this.props.getMarkers(user.markers);
        this.setState({
            curLat: this.props.markersAll[0].lat,
            curLng: this.props.markersAll[0].lng,
        })
    }

    getAllMarkers = async () => {
        await fetch(`${API}/getAllMarkers`)
            .then(e => e.json())
            .then(this.getMarkersAndUpdateCurrentZoom)
    }

    editMarker = async (e) => {
        const { lat, lng } = e.latlng;
        const { id, name, place, description } = e.target.options
        await fetch(`${API}/editMarker`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({ markerId: id, name, lat, lng, place, description })
        })
            .then(e => e.json())
            .then(user => { console.log(user.markers) })
    }

    removeMarker = () => {

    }

    handleShowMarkerList = () => {
        const markerList = document.querySelector('.marker');
        markerList.classList.toggle('marker--active');
    }

    handleMarkerClick = (e) => {
        this.setState({ curLat: e.latlng.lat, curLng: e.latlng.lng });
    }

    handleZoom = (e) => {
        this.setState({ curZoom: e.target._animateToZoom })
    }

    handleMarkerListActiveItem = (e) => {
        const { markersAll } = this.props;
        function findMarkerId(el) {
            return e.target.parentElement.dataset.markerid === el.id
        }
        const lat = markersAll[markersAll.findIndex(findMarkerId)] ? markersAll[markersAll.findIndex(findMarkerId)].lat : this.state.curLat;
        const lng = markersAll[markersAll.findIndex(findMarkerId)] ? markersAll[markersAll.findIndex(findMarkerId)].lng : this.state.curLng;
        this.setState({ curLat: lat, curLng: lng });
        if (Array.from(e.target.parentElement.classList).includes('marker__item')) {
            if (Array.from(e.target.parentElement.classList).includes('marker__item--active') && Array.from(e.target.classList).includes('marker__item-title')) {
                e.target.parentElement.classList.remove('marker__item--active');
            } else {
                document.querySelectorAll('.marker__item').forEach(e => {
                    e.classList.remove('marker__item--active');
                })
                e.target.parentElement.classList.add('marker__item--active')
            }
        }
    }

    handleMarkerMapActiveItem = (e) => {
        document.querySelectorAll('.marker__item').forEach(e => {
            e.classList.remove('marker__item--active');
        });
        document.querySelector(`[data-markerid='${e.target.options.id}'`).classList.add('marker__item--active');
        this.handleMarkerClick(e)
    }

    componentDidMount() {
        this.getAllMarkers();
    }

    render() {
        return (<>
            <main className="logged__wrap">
                <Header
                    logOut={this.props.logOut}
                    handleShowMarkerList={this.handleShowMarkerList}>
                </Header>
                <MapComponent
                    curLat={this.state.curLat}
                    curLng={this.state.curLng}
                    curZoom={this.state.curZoom}
                    handleZoom={this.handleZoom}
                    handleMarkerClick={this.handleMarkerClick}
                    handleMarkerMapActiveItem={this.handleMarkerMapActiveItem}
                    editMarker={this.editMarker}
                >
                </MapComponent>
                <MarkerList handleMarkerListActiveItem={this.handleMarkerListActiveItem}></MarkerList>
            </main>
        </>);
    }
}

const MSTP = state => {
    return {
        markersAll: state.markers
    }
};

const MDTP = {
    getMarkers
}

export default connect(MSTP, MDTP)(MainPageLogged);