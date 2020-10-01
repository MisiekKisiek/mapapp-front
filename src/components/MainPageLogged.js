import React, { Component } from 'react';
import { connect } from 'react-redux';

//Actions
import { getMarkers } from '../actions/markers.action';

//Components
import Header from './HeaderLogged';
import MapComponent from './MapComponent';
import MarkerList from './MarkerList';
import ContextMenu from './ContextMenu';
import AddMarker from './AddMarker';

//Tools
import { API } from '../tools/apiPrefixes';

class MainPageLogged extends Component {
    constructor(props) {
        super(props)
        this.state = {
            curLat: 52,
            curLng: 21,
            curZoom: 10,
            addMarkerLat: null,
            addMarkerLng: null
        }
    }


    getAllMarkers = async (lat, lng) => {
        await fetch(`${API}/getAllMarkers`, {
            headers: {
                Authorization: `bearer ${sessionStorage.getItem("token")}`
            }
        })
            .then(e => {
                if (e.ok) {
                    return e.json()
                } else {
                    this.props.logOut();
                    throw Error("You have been logged out")
                }
            })
            .then(async (markers) => {
                if (sessionStorage.getItem('logged') === "logged") {
                    await this.props.getMarkers(markers.markers);
                    this.getMarkersAndUpdateCurrentZoom(markers, lat, lng);
                }
            }
            ).catch(err => { console.log(err) })
    }

    addMarker = (e, lat, lng, name, place, description) => {
        fetch(`${API}/addMarker`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `bearer ${sessionStorage.getItem("token")}`
            },
            body: JSON.stringify({ lat, lng, name, place, description })
        }).then(e => e.json()).then(e => {
            this.getAllMarkers(lat, lng);
        })
    }

    editMarker = async (e) => {
        const { lat, lng } = e.target._latlng;
        const { id, name, place, description } = e.target.options
        await fetch(`${API}/editMarker`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `bearer ${sessionStorage.getItem("token")}`,
            },
            mode: 'cors',
            body: JSON.stringify({ markerId: id, name, lat, lng, place, description })
        })
            .then(e => {
                if (e.ok) {
                    return e.json()
                } else {
                    this.props.logOut();
                }
            })
            .then(async user => {
                this.props.forceUpdateApp();
                await this.getAllMarkers(lat, lng);
            })
    }

    removeMarker = () => {

    }

    getMarkersAndUpdateCurrentZoom = async (user, lat, lng) => {
        if (this.props.markersAll[0]) {
            await this.props.getMarkers(user.markers);
            if (lat && lng) {
                this.setState({
                    curLat: lat,
                    curLng: lng,
                })
                return
            }
            this.setState({
                curLat: this.props.markersAll[0].lat,
                curLng: this.props.markersAll[0].lng,
            })
        }
    }

    handleAddMarkerPosition = (lat, lng) => {
        this.setState({
            addMarkerLat: lat,
            addMarkerLng: lng
        })
    }

    handleSetCenter = (lat, lng) => {
        this.setState({ curLat: lat, curLng: lng });
    }

    handleZoom = (e) => {
        this.setState({ curZoom: e.target._animateToZoom })
    }

    handleMarkerListActiveItem = async (e) => {
        const { markersAll } = this.props;
        const element = e.target;
        function findMarkerId(el) {
            return e.target.parentElement.dataset.markerid === el._id
        }
        const lat = markersAll[markersAll.findIndex(findMarkerId)] ?
            markersAll[markersAll.findIndex(findMarkerId)].lat :
            this.state.curLat;
        const lng = markersAll[markersAll.findIndex(findMarkerId)] ?
            markersAll[markersAll.findIndex(findMarkerId)].lng :
            this.state.curLng;
        if (Array.from(element.classList).includes('marker__item-title')) {
            this.setState({ curLat: lat, curLng: lng })
        }
        if ((lat === this.state.curLat &&
            lng === this.state.curLng) ||
            !Array.from(element.parentElement.classList).includes('marker__item--active')) {
            if (Array.from(element.parentElement.classList).includes('marker__item')) {
                if (Array.from(element.parentElement.classList).includes('marker__item--active') && Array.from(element.classList).includes('marker__item-title')) {
                    element.parentElement.classList.remove('marker__item--active');
                } else {
                    document.querySelectorAll('.marker__item').forEach(e => {
                        e.classList.remove('marker__item--active');
                    })
                    element.parentElement.classList.add('marker__item--active')
                }
            }
        }
    }

    handleMarkerMapActiveItem = (e) => {
        const items = document.querySelectorAll('.marker__item') ? Array.from(document.querySelectorAll('.marker__item')) : null;
        const markerMap = e.target;
        this.handleSetCenter(markerMap._latlng.lat, markerMap._latlng.lng);
        if (items !== null && items !== undefined) {
            items.forEach(e => {
                e.classList.remove('marker__item--active');
            });
            if (document.querySelector(`li[data-markerid="${markerMap.options.id}"]`)) {
                document.querySelector(`li[data-markerid="${markerMap.options.id}"]`).classList.add('marker__item--active');
            }
        }
    }

    handleAddMarkerElementVisible = (type) => {
        const addMarkerElement = document.querySelector('.add-marker');
        if (type === "context" && !Array.from(addMarkerElement).includes('add-marker--active')) {
            addMarkerElement.classList.add('add-marker--active')
        } else if (type === "submit" && !Array.from(addMarkerElement).includes('add-marker--active')) {
            addMarkerElement.classList.remove('add-marker--active')
        }
    }

    componentDidMount() {
        this.getAllMarkers();
    }

    render() {
        return (<>
            <main className="logged__wrap">
                <MapComponent
                    curLat={this.state.curLat}
                    curLng={this.state.curLng}
                    curZoom={this.state.curZoom}
                    handleZoom={this.handleZoom}
                    handleSetCenter={this.handleSetCenter}
                    handleMarkerMapActiveItem={this.handleMarkerMapActiveItem}
                    editMarker={this.editMarker}
                    handleAddMarkerPosition={this.handleAddMarkerPosition}
                />
                <MarkerList handleMarkerListActiveItem={this.handleMarkerListActiveItem} />
                <ContextMenu handleAddMarkerElementVisible={this.handleAddMarkerElementVisible} />
                <AddMarker
                    addMarker={this.addMarker}
                    getAllMarkers={this.getAllMarkers}
                    lat={this.state.addMarkerLat}
                    lng={this.state.addMarkerLng}
                    handleAddMarkerElementVisible={this.handleAddMarkerElementVisible}
                    getMarkersAndUpdateCurrentZoom={this.getMarkersAndUpdateCurrentZoom}
                />
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