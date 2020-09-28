import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { icon } from '../tools/iconMarker'
import { connect } from 'react-redux';


const MapComponent = ({ curLat, curLng, curZoom, handleZoom, handleSetCenter, handleMarkerMapActiveItem, markersAll, editMarker }) => {

    const renderAllMarkers = () => {
        const markers = markersAll.map((e, index) => {
            const { _id, name, place, description, lat, lng } = e;
            return (<Marker
                key={_id}
                id={_id}
                name={name}
                place={place}
                description={description}
                position={[lat, lng]}
                icon={icon}
                draggable={true}
                ondragend={async e => {
                    await editMarker(e);
                    handleMarkerMapActiveItem(e);
                }}
                onclick={(e) => {
                    handleMarkerMapActiveItem(e);
                }}
            >
                <Popup closeOnClick={false} >
                    <div className="map__popup">
                        <span className="map__popup-name">{name}</span>
                        <span className="map__popup-place">{place}</span>
                        <span className="map__popup-description">{description}</span>
                    </div>
                </Popup>
            </Marker>)
        });
        return markers
    }

    return (<>
        <Map className="map" center={[curLat, curLng]} zoom={curZoom} onzoomend={handleZoom} onzoomlevelschange={handleZoom} ondragend={(e) => { handleSetCenter(e.target.getCenter().lat, e.target.getCenter().lng) }}>
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