import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { icon } from '../tools/iconMarker'
import { connect } from 'react-redux';

class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 52.21,
            lng: 21.02,
            lat1: 52.21,
            lng1: 21.02,
            zoom: 13,
        }
    }

    handleClick = (e) => {
        this.setState({ lat: e.latlng.lat, lng: e.latlng.lng });
    }
    handleClick1 = (e) => {
        this.setState({ lat1: e.latlng.lat, lng1: e.latlng.lng });
    }

    handleZoom = (e) => {
        this.setState({ zoom: e.target._animateToZoom })
    }

    render() {
        return (<>
            <Map className="map" center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} onzoomend={this.handleZoom} onzoomlevelschange={this.handleZoom}>
                <TileLayer
                    attribution={'&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
                <Marker position={[this.state.lat, this.state.lng]} icon={icon} draggable={true} onmouseup={this.handleClick}>
                    <Popup>
                        dfasfasfasf
                    </Popup>
                </Marker>
                {/* <Marker position={[this.state.lat1, this.state.lng1]} icon={icon} draggable={true} onmouseup={this.handleClick1}>
                    <Popup>
                        dfasfasfasf
                    </Popup>
                </Marker> */}
            </Map>
        </>);
    }
}

const MSTP = state => {
    return {

    }
}

const MDTP = {}

export default connect(MSTP, MDTP)(MapComponent);