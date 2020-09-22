import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { icon } from '../tools/iconMarker'
import { connect } from 'react-redux';


const MapComponent = ({ curLat, curLng, curZoom, handleZoom, handleMarkerClick, handleMarkerMapActiveItem, markersAll, editMarker }) => {

    const renderAllMarkers = () => {
        const markers = markersAll.map((e, index) => {
            const { id, name, place, description, lat, lng } = e;
            return (<Marker
                key={id}
                id={id}
                name={name}
                place={place}
                description={description}
                position={[lat, lng]}
                icon={icon}
                draggable={true}
                onmouseup={e => { handleMarkerClick(e); editMarker(e) }}
                onclick={(e) => {
                    handleMarkerMapActiveItem(e)
                }}
            >
                <Popup >{e.descripion} Miejsce sobie</Popup>
            </Marker>)
        });
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