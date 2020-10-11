import React, { useContext } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { icon } from "../tools/iconMarker";
import { connect } from "react-redux";

//Context
import AppContext from "../context/AppContext";

const MapComponent = ({ handleMarkerActiveItem, markersAll, editMarker }) => {
  const {
    curLat,
    curLng,
    curZoom,
    handleSetCenter,
    filterMarkers,
    handleAddMarkerPosition,
  } = useContext(AppContext);

  const handleZoom = (e) => {
    handleSetCenter(curLat, curLng, e.target._animateToZoom);
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

        return lat && lng ? (
          <Marker
            key={_id}
            id={_id}
            name={name}
            place={place}
            description={description}
            position={[lat, lng]}
            icon={icon}
            // draggable={true}
            ondragend={async (e) => {
              await editMarker(e);
              handleMarkerActiveItem(e);
            }}
            onclick={(e) => {
              // handleMarkerMapActiveItem(e);
              handleMarkerActiveItem(e);
            }}
          >
            <Popup closeOnClick={true}>
              <div className="map__popup">
                <span className="map__popup-name">{name}</span>
                <span className="map__popup-place">{place}</span>
                <span className="map__popup-description">{description}</span>
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
          document.querySelector(
            ".context-menu"
          ).style.top = `${e.originalEvent.clientY}px`;
          document.querySelector(
            ".context-menu"
          ).style.left = `${e.originalEvent.clientX}px`;
          document.querySelector(".context-menu").style.display = "block";
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

const MDTP = {};

export default connect(MSTP, MDTP)(MapComponent);
