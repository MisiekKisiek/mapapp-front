import React from "react";

const MarkerListItem = ({
  handleMarkerMapActiveItemTEST,
  activeMarker,
  removeMarker,
  marker,
  id,
}) => {
  const { lat, lng, name, place, description } = marker;

  const removeMarkerFunc = (e) => {
    e.preventDefault();
    removeMarker(id);
  };

  return (
    <>
      <li
        className={`marker__item ${
          activeMarker === id ? "marker__item--active" : ""
        }`}
      >
        <h2
          className="marker__item-title"
          data-markerid={id}
          onClick={(e) => {
            handleMarkerMapActiveItemTEST(e);
          }}
        >
          {name}
        </h2>
        <section className="marker__item-section">
          <p className="marker__place">
            Place: <span>{place}</span>
          </p>
          <p className="marker__description">{description}</p>
        </section>
        <button className="marker__remove-btn" onClick={removeMarkerFunc}>
          <i className="fas fa-times"></i>
        </button>
        <button className="marker__edit-btn">
          <i className="fas fa-pen"></i>
        </button>
      </li>
    </>
  );
};

export default MarkerListItem;
