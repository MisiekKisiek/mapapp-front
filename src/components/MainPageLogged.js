import React, { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

//Actions
import { setMarkers } from "../actions/markers.action";

//Components
import MapComponent from "./MapComponent";
import MarkerList from "./MarkerList";
import ContextMenu from "./ContextMenu";
import AddMarker from "./AddMarker";
import Helper from "./Helper";

//Tools
import { API } from "../tools/apiPrefixes";

//Context
import AppLoggedContext from "../context/AppLoggedContext";

const MainPageLogged = ({  logOut }) => {

  //Context-connect
  const {
    addMarkerComponentVisibility,
    curLat,
    curLng,
    handleSetCenter,
    activeMarker,
    handleActiveMarker,
    activeHelper,
  } = useContext(AppLoggedContext);


  //Redux-connect
  const markersAll = useSelector(state => state.markers)  
  const dispatch = useDispatch();

  const contextMenuRef = useRef(null);


  //API fetch funcs
  const getAllMarkers = async (phase) => {
    fetch(`${API}/getAllMarkers`, {
      headers: {
        Authorization: `bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((e) => {
        if (e.ok) {
          return e.json();
        } else {
          logOut();
          throw Error("You have been logged out");
        }
      })
      .then((markers) => {
        if (sessionStorage.getItem("logged") === "logged") {
          dispatch(setMarkers(markers));
          return markers;
        }
      })
      .then((markers) => {
        if (markers.length > 0) {
          if (phase === "addmarker") {
            handleMarkerActiveItem(
              null,
              markers[markers.length - 1]._id,
              markers
            );
            return;
          }
          handleMarkerActiveItem(null, markers[0]._id, markers);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addMarker = (lat, lng, name, place, description) => {
    fetch(`${API}/addMarker`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ lat, lng, name, place, description }),
    })
      .then((e) => {
        if (e.ok) {
          return e.json();
        } else {
          logOut();
          throw Error("You have been logged out");
        }
      })
      .then((e) => {
        getAllMarkers("addmarker");
      });
  };

  const editMarker = (e) => {
    const { lat, lng } = e.target._latlng;
    const { id, name, place, description } = e.target.options;
    fetch(`${API}/editMarker`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${sessionStorage.getItem("token")}`,
      },
      mode: "cors",
      body: JSON.stringify({
        markerId: id,
        name,
        lat,
        lng,
        place,
        description,
      }),
    })
      .then((e) => {
        if (e.ok) {
          return e.json();
        } else {
          logOut();
          throw Error("You have been logged out");
        }
      })
      .then((user) => {
        getAllMarkers();
      });
  };

  const removeMarker = (markerId) => {
    fetch(`${API}/removeMarker`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ markerId }),
    })
      .then((e) => {
        if (e.ok) {
          return e.json();
        } else {
          logOut();
          throw Error("You have been logged out");
        }
      })
      .then((e) => {
        getAllMarkers();
      });
  };

  const handleMarkerActiveItem = (e, _id, _markers, a) => {
    //set id, if it's given and if it's correct, then if it's in Marker or MarkerListItem
    let id = "";
    if (_id) id = _id;
    else if (e) {
      if (e.target.options) id = e.target.options.id;
      else if (e.target.dataset.markerid) id = e.target.dataset.markerid;
    } else return;

    let findMarker = {};
    //If _markers arg is given set findMarker, then if not set findMarker as redux state markersAll, if both no then exit
    if (_markers && _markers.length > 0) {
      findMarker = _markers[_markers.findIndex((el) => el._id === id)];
    } else if (markersAll.length > 0) {
      findMarker = markersAll[markersAll.findIndex((el) => el._id === id)];
    } else return;

    //If it's MarkerListItem, Marker is in center and marker is open, hide activeMarker and return
    if (
      findMarker.lat === curLat &&
      findMarker.lng === curLng &&
      activeMarker !== null &&
      e
    ) {
      if (e.target.dataset) {
        handleActiveMarker(null);
        return;
      }
    }
    //If not, set active marker and ...
    handleActiveMarker(id);
    //If it's map marker, don't set center, else set center
    if (!e) handleSetCenter(findMarker.lat, findMarker.lng);
    else {
      if (!e.target.options) handleSetCenter(findMarker.lat, findMarker.lng);
    }
  };

  useEffect(() => {
    getAllMarkers();
    return () => {
      dispatch(setMarkers([]));
    };
  }, []);

  //Rendering elements with conditions
  const addMarkerToggle = addMarkerComponentVisibility ? (
    <AddMarker addMarker={addMarker} />
  ) : null;

  const helperToggle = activeHelper ? <Helper /> : null;

  return (
    <>
      <main className="logged__wrap">
        <MapComponent
          handleMarkerActiveItem={handleMarkerActiveItem}
          editMarker={editMarker}
          contextMenuRef={contextMenuRef}
        />
        <MarkerList
          handleMarkerActiveItem={handleMarkerActiveItem}
          removeMarker={removeMarker}
        />
        <ContextMenu forwardRef={contextMenuRef} />
        {addMarkerToggle}
        {helperToggle}
      </main>
    </>
  );
};

export default MainPageLogged;
