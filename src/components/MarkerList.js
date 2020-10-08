import React, { useState } from "react";
import { connect } from "react-redux";

//Components
import Marker from "./MarkerListItem";

const MarkerList = ({
  handleMarkerMapActiveItemTEST,
  activeMarker,
  markersAll,
  removeMarker,
  showMarkerList,
  filterMarkers,
  handleFilterMarkers,
}) => {
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
      .map((e, index) => (
        <Marker
          key={e._id}
          id={e._id}
          marker={e}
          handleMarkerMapActiveItemTEST={handleMarkerMapActiveItemTEST}
          activeMarker={activeMarker}
          removeMarker={removeMarker}
        ></Marker>
      ));
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
                placeholder="Search..."
                value={filterValue}
                onChange={handleFilterValue}
              />
              <button
                onClick={handleRemoveFilter}
                className="marker__form-clear"
              >
                <i className="fas fa-times-circle"></i>
              </button>
              <button
                type="submit"
                className="marker__form-submit"
                onClick={handleFilter}
              >
                <i className="fas fa-search"></i>
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

const MSTP = (state) => {
  return { markersAll: state.markers };
};

export default connect(MSTP)(MarkerList);
