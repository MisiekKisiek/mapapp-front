import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { icon } from '../tools/iconMarker'
import { connect } from 'react-redux';


const MapComponent = ({ curLat, curLng, curZoom, handleZoom, handleMarkerClick, markersAll }) => {

    const renderAllMarkers = () => {
        const markers = markersAll.map((e, index) =>
            <Marker
                key={e.id}
                position={[e.lat, e.lng]}
                icon={icon}
                draggable={true}
                onmouseup={handleMarkerClick}
                id={e.id}
            >
                <Popup>{e.descripion}</Popup>
            </Marker>);
        return markers
    }

    return (<>
        <Map className="map" center={[curLat, curLng]} zoom={curZoom} onzoomend={handleZoom} onzoomlevelschange={handleZoom}>
            <TileLayer
                attribution={'&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
                url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            />
            {renderAllMarkers()}
        </Map>
    </>);
}

const MSTP = state => {
    return {
        markersAll: state.markers
    }
}

const MDTP = {}

export default connect(MSTP, MDTP)(MapComponent);