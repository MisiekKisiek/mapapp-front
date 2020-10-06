import React from "react";

const MarkerListItem = ({
  handleMarkerListActiveItem,
  removeMarker,
  marker,
  first,
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
        className={`marker__item ${first ? "marker__item--active" : ""}`}
        data-markerid={id}
        onClick={(e) => {
          handleMarkerListActiveItem(e);
        }}
      >
        <h2 className="marker__item-title">{name}</h2>
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
