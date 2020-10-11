import React, { useState, useContext } from "react";

//Context
import AppContext from "../context/AppContext";

const AddMarker = ({ addMarker }) => {
  const [name, setname] = useState("");
  const [place, setplace] = useState("");
  const [description, setdescription] = useState("");

  const {
    addMarkerLat,
    addMarkerLng,
    handleAddMarkerElementVisible,
  } = useContext(AppContext);

  const lat = addMarkerLat ? addMarkerLat : 52;
  const lng = addMarkerLng ? addMarkerLng : 21;

  const handleInputs = (e) => {
    switch (e.target.id) {
      case "name":
        setname(e.target.value);
        break;
      case "place":
        setplace(e.target.value);
        break;
      case "description":
        setdescription(e.target.value);
        break;
      default:
        break;
    }
  };

  const clearInputHooks = () => {
    setname("");
    setplace("");
    setdescription("");
  };

  const handleAddMarker = async (e) => {
    e.preventDefault();
    await addMarker(lat, lng, name, place, description);
    handleAddMarkerElementVisible("submit");
    clearInputHooks();
  };

  const handleCancelMarker = (e) => {
    e.preventDefault();
    handleAddMarkerElementVisible("submit");
    clearInputHooks();
  };

  return (
    <>
      <div className="add-marker">
        <div className="add-marker__courtine"></div>
        <div className="add-marker__wrap">
          <h3 className="add-marker__title">Add Marker</h3>
          <form className="add-marker__form">
            <div className="add-marker__input">
              <label htmlFor="name"></label>
              <input
                id="name"
                type="text"
                placeholder="title"
                maxLength="10"
                value={name}
                onChange={handleInputs}
              />
            </div>
            <div className="add-marker__input">
              <label htmlFor="place"></label>
              <input
                id="place"
                type="text"
                placeholder="place"
                maxLength="10"
                value={place}
                onChange={handleInputs}
              />
            </div>
            <div className="add-marker__input">
              <label htmlFor="description"></label>
              <textarea
                id="description"
                placeholder="description"
                maxLength="50"
                value={description}
                onChange={handleInputs}
              ></textarea>
            </div>
            <div className="add-marker__buttons">
              <button type="submit" onClick={handleAddMarker}>
                Add
              </button>
              <button type="reset" onClick={handleCancelMarker}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddMarker;
