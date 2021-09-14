import React, { useContext } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { connect } from "react-redux";

//Context
import AppLoggedContext from "../context/AppLoggedContext";

//Images
import { icon, iconActive, iconActiveEdit } from "../tools/iconMarker";

const MapComponent = ({
  handleMarkerActiveItem,
  markersAll,
  contextMenuRef,
}) => {
  const {
    curLat,
    curLng,
    curZoom,
    handleSetCenter,
    filterMarkers,
    activeMarker,
    handleAddMarkerPosition,
    editMarkerState,
    editLatLng,
    handleEditLatLng,
  } = useContext(AppLoggedContext);

  const handleZoom = (e) => {
    handleSetCenter(curLat, curLng, e.target._animateToZoom);
  };

  const handleContextMenuPosition = (e) => {
    const menu = contextMenuRef.current;
    menu.style.top = `${e.originalEvent.clientY}px`;
    menu.style.left = `${e.originalEvent.clientX}px`;
    menu.style.display = "block";
  };

  const renderAllMarkers = (_markers, filter) => {
    const markers = _markers
      .filter((e) =>
        `${e.name}${e.place}${e.description}`
          .toLowerCase()
          .includes(filter.toLowerCase())
      )
      .map((e) => {
        const { _id, name, place, description, lat, lng } = e;

        const isEditing = editMarkerState === _id? true:false

        return lat && lng ? (
          <Marker
            key={_id}
            id={_id}
            name={name}
            place={place}
            description={description}
            position={isEditing?editLatLng:[lat, lng]}
            icon={activeMarker === _id ? (isEditing?iconActiveEdit:iconActive) : icon}
            draggable={isEditing}
            ondragend={(e) => {
              const lat = e.target._latlng.lat;
              const lng = e.target._latlng.lng;
              handleEditLatLng(lat,lng)          
            }}
            onclick={(e) => {
              console.log(isEditing)
              if(isEditing) return
              else {
                handleMarkerActiveItem(e);
                handleSetCenter(lat, lng);
              }
            }}
          >
            <Popup 
            closeOnClick={true}         
            onClick={(e)=>{console.log(e)}}>
              <div className="map__popup">
                <span className="map__popup-name">{name}</span>
                <span className="map__popup-place">Place: {place}</span>
              </div>
            </Popup>
          </Marker>
        ) : null;
      });
    return markers;
  };

  return (
    <>
      <Map
        className="map"
        center={[curLat, curLng]}
        zoom={curZoom}
        onzoomend={handleZoom}
        onzoomlevelschange={handleZoom}
        ondragend={(e) => {
          handleSetCenter(e.target.getCenter().lat, e.target.getCenter().lng);
        }}
        oncontextmenu={async (e) => {
          const { lat, lng } = e.latlng;
          await handleAddMarkerPosition(lat, lng);
          handleContextMenuPosition(e);
        }}
      >
        <TileLayer
          attribution={
            '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }
          url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}

        />
        {renderAllMarkers(markersAll, filterMarkers)}

      </Map>
    </>
  );
};

const MSTP = (state) => {
  return {
    markersAll: state.markers,
  };
};


export default connect(MSTP)(MapComponent);
