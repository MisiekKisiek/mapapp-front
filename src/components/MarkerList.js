import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";

//Components
import Marker from "./MarkerListItem";

//Context
import AppLoggedContext from "../context/AppLoggedContext";

const MarkerList = ({ handleMarkerActiveItem, removeMarker, editMarker }) => {
  const {
    activeMarker,
    filterMarkers,
    showMarkerList,
    handleFilterMarkers,
  } = useContext(AppLoggedContext);

  const markersAll = useSelector(state => state.markers);

  const [filterValue, setfilterValue] = useState("");

  const handleFilterValue = (e) => {
    setfilterValue(e.target.value);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    handleFilterMarkers(filterValue);
  };

  const handleRemoveFilter = (e) => {
    e.preventDefault();
    setfilterValue("");
    handleFilterMarkers("");
  };

  const renderMarkerItems = (_markers, filter) => {
    const markers = _markers
      .filter((e) => {
        const allInfo = `${e.name ? e.name : ""}${e.place ? e.place : ""}${
          e.description ? e.description : ""
        }`;
        return allInfo.toLowerCase().includes(filter.toLowerCase());
      })
      .map((e) => {
        return (
          <Marker
            key={e._id}
            marker={e}
            handleMarkerActiveItem={handleMarkerActiveItem}
            activeMarker={activeMarker}
            removeMarker={removeMarker}
            editMarker={editMarker}
          ></Marker>
        );
      });
    return markers;
  };

  return (
    <>
      <aside className={`marker ${showMarkerList ? "marker--active" : ""}`}>
        <div className="marker__wrap">
          <form className="marker__form-filter">
            <div className="marker__filter">
              <input
                type="text"
                placeholder="Search marker..."
                value={filterValue}
                onChange={handleFilterValue}
              />
              <button
                type="submit"
                className="marker__form-submit"
                onClick={handleFilter}
              >
                <i className="fas fa-search"></i>
              </button>
              <button
                onClick={handleRemoveFilter}
                className="marker__form-clear"
              >
                <i className="fas fa-times-circle"></i>
              </button>
            </div>
          </form>
          <ul className="marker__list">
            {renderMarkerItems(markersAll, filterMarkers)}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default MarkerList;
