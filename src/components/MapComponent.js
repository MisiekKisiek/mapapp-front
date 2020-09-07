import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 52.21,
            lng: 21.02,
            zoom: 13,
        }
    }

    handleClick = (e) => {
        console.log('marker', e)
        // console.log('latlng', e.latlng)
        this.setState({ lat: e.latlng.lat, lng: e.latlng.lng });
    }

    handleZoom = (e) => {
        console.log(e.target._animateToZoom)
        this.setState({ zoom: e.target._animateToZoom })
    }

    render() {
        return (<>
            <Map className="map" center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} onzoomend={this.handleZoom} onzoomlevelschange={this.handleZoom}>
                <TileLayer
                    attribution={'&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
                <Marker position={[this.state.lat, this.state.lng]} draggable={true} onmouseup={this.handleClick}>
                    <Popup>
                        dfasfasfasf
                    </Popup>
                </Marker>
            </Map>
        </>);
    }
}

export default MapComponent;