import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

//Components
import Marker from "./MarkerListItem";

const MarkerList = ({
  markersAll,
  handleMarkerListActiveItem,
  removeMarker,
}) => {
  const [filterValue, setfilterValue] = useState("");
  const [filter, setfilter] = useState("");

  const handleFilterValue = (e) => {
    setfilterValue(e.target.value);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setfilter(filterValue);
  };

  const handleRemoveFilter = (e) => {
    e.preventDefault();
    setfilterValue("");
    setfilter("");
  };

  const renderMarkerItems = (filter) => {
    const markers = markersAll
      .filter((e) => {
        const allInfo = `${e.name ? e.name : ""}${e.place ? e.place : ""}${
          e.description ? e.description : ""
        }`;
        console.log(allInfo);
        return allInfo.toLowerCase().includes(filter.toLowerCase());
      })
      .map((e, index) => (
        <Marker
          key={e._id}
          id={e._id}
          marker={e}
          handleMarkerListActiveItem={handleMarkerListActiveItem}
          removeMarker={removeMarker}
          first={index === 0 ? true : false}
        ></Marker>
      ));
    return markers;
  };

  return (
    <>
      <aside className="marker marker--active">
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
                <i class="fas fa-times-circle"></i>
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
          <ul className="marker__list">{renderMarkerItems(filter)}</ul>
        </div>
      </aside>
    </>
  );
};

const MSTP = (state) => {
  return { markersAll: state.markers };
};

export default connect(MSTP)(MarkerList);
