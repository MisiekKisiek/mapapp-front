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

    getAllMarkers = async () => {
        await fetch(`${API}/api/getAllMarkers`)
            .then(
                e => e.json())
            .then(async user => {
                await this.props.getMarkers(user.markers);
                this.setState({
                    curLat: this.props.markersAll[0].lat,
                    curLng: this.props.markersAll[0].lng,
                })
            })
    }

    editMarkerLocation = () => {

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
        document.querySelector('.marker__item--active').classList.remove('marker__item--active');
        e.target.parentNode.classList.add('marker__item--active');
        const findMarkerIndex = (element, givenElement) => {
            return givenElement.target.parentNode.dataset.markerId === element.id
        }
        const lat = this.props.markersAll[this.props.markersAll.findIndex(el => findMarkerIndex(el, e))].lat;
        const lng = this.props.markersAll[this.props.markersAll.findIndex(el => findMarkerIndex(el, e))].lng;
        this.setState({ curLat: lat, curLng: lng, curZoom: 10 })
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
                    handleMarkerClick={this.handleMarkerClick}>
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