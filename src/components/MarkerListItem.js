import React,{useState,useEffect, useContext} from "react";

//Context
import AppLoggedContext from "../context/AppLoggedContext";

const MarkerListItem = ({
  handleMarkerActiveItem,
  activeMarker,
  removeMarker,
  editMarker,
  marker,
}) => {
  const { _id,lat,lng, name, place, description } = marker;

  const {
    editMarkerState,
    handleEditMarkerState,
    editLatLng,
    handleAlertComponentVisibility,} = useContext(AppLoggedContext);

  const [nameEdit, setnameEdit] = useState(name);
  const [placeEdit, setplaceEdit] = useState(place);
  const [descriptionEdit, setdescriptionEdit] = useState(description);

  const removeMarkerTriggerFunc = (e) => {
    e.preventDefault();
    handleAlertComponentVisibility(removeMarkerFunc,"Do You want to remove this marker?");
  };

  const removeMarkerFunc = () => {
    removeMarker(_id)
  }

  const editMarkerFunc = (e) => {
    e.preventDefault();
    editMarker(e,editLatLng[0],editLatLng[1],_id,nameEdit,placeEdit,descriptionEdit)
  }

  const setEditInputs = () =>{
    setnameEdit(name);
    setplaceEdit(place);
    setdescriptionEdit(description)
  }

  const handleActiveMarker = (e) => {
    if(editMarkerState===_id){
      return
    } 
    handleMarkerActiveItem(e);
    handleEditMarkerState();
  }

  const setEditState = (e) => {
    e.preventDefault();
    handleEditMarkerState(_id,lat,lng);
  }

  const cancelEditState = () => {
    handleEditMarkerState();
    setEditInputs();
  }

  useEffect(() => {
    return () => {
      handleEditMarkerState();
    }
  }, [])

  return (
    <>
      <li
        data-markerid={_id}
        className={`marker__item ${activeMarker === _id ? "marker__item--active" : ""}
        ${(editMarkerState===_id && activeMarker === _id)?"marker__item--edit" :""}
        `}
      >

        <h2
          className="marker__item-title"
          onClick={handleActiveMarker}
        >
          <span>{name}</span>
          <input type="text" value={nameEdit} onChange={(e)=>{setnameEdit(e.target.value)}}/>
        </h2>
        <section className="marker__item-section">
          <p className="marker__place">
            <span>Place: <span>{place}</span></span>
            <input type="text" value={placeEdit} onChange={(e)=>{setplaceEdit(e.target.value)}}/>
          </p>
          <p className="marker__description">
            <span>{description}</span>
            <textarea name="desctiprion" id="desctiprion" value={descriptionEdit} onChange={(e)=>{setdescriptionEdit(e.target.value)}}></textarea>
          </p>
        </section>
        <button className="marker__remove-btn" onClick={removeMarkerTriggerFunc}>
          <i className="fas fa-times"></i>
        </button>
        <button className="marker__edit-cancel" onClick={cancelEditState}>
          <i className="fas fa-times"></i>
        </button>
        <button className="marker__edit-btn" onClick={setEditState}>
          <i className="fas fa-pen"></i>
        </button>
        <button className="marker__edit-accept" onClick={editMarkerFunc}>
          <i className="fas fa-check"></i>
        </button>
      </li>
    </>
  );
};

export default MarkerListItem;
