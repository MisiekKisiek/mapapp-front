import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";

//Actions
import { setMarkers } from "../actions/markers.action";

//Components
import MapComponent from "./MapComponent";
import MarkerList from "./MarkerList";
import ContextMenu from "./ContextMenu";
import AddMarker from "./AddMarker";

//Tools
import { API } from "../tools/apiPrefixes";

//Context
import AppContext from "../context/AppContext";

const MainPageLogged = ({ forceUpdateApp, logOut, setMarkers, markersAll }) => {
  const {
    addMarkerComponentVisibility,
    handleAddMarkerElementVisible,
    addMarkerLat,
    addMarkerLng,
    handleAddMarkerPosition,
    curLat,
    curLng,
    curZoom,
    handleSetCenter,
    showMarkerList,
    filterMarkers,
    handleFilterMarkers,
    activeMarker,
    handleActiveMarker,
  } = useContext(AppContext);

  const getAllMarkers = async (lat, lng, phase) => {
    await fetch(`${API}/getAllMarkers`, {
      headers: {
        Authorization: `bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((e) => {
        if (e.ok) {
          return e.json();
        } else {
          this.props.logOut();
          throw Error("You have been logged out");
        }
      })
      .then(async (markers) => {
        if (sessionStorage.getItem("logged") === "logged") {
          await setMarkers(markers);
          console.log(markersAll);
          return markers;
        }
      })
      .then((markers) => {
        if (phase === "addmarker") {
          handleMarkerMapActiveItemTEST(null, markers[markers.length - 1]._id);
          return;
        }
        handleMarkerMapActiveItemTEST(null, markers[0]._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addMarker = async (lat, lng, name, place, description) => {
    await fetch(`${API}/addMarker`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ lat, lng, name, place, description }),
    })
      .then((e) => e.json())
      .then(async (e) => {
        await getAllMarkers(lat, lng, "addmarker");
      });
  };

  const editMarker = async (e) => {
    const { lat, lng } = e.target._latlng;
    const { id, name, place, description } = e.target.options;
    await fetch(`${API}/editMarker`, {
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
        }
      })
      .then(async (user) => {
        forceUpdateApp();
        await getAllMarkers(lat, lng);
      });
  };

  const removeMarker = async (id) => {
    await fetch(`${API}/removeMarker`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((e) => e.json())
      .then((e) => {
        getAllMarkers();
      });
  };

  const handleMarkerMapActiveItemTEST = (e, _id) => {
    console.log("setelements");
    //set id, if it's given, then if it's in Marker or MarkerListItem
    const id = _id
      ? _id
      : e.target.options
      ? e.target.options.id
      : e.target.dataset.markerid
      ? e.target.dataset.markerid
      : "";
    const findMarker = markersAll[markersAll.findIndex((e) => e._id === id)];
    //If its markerlistitem, marker is in center and marker is open, hide activeMarker and return
    if (
      findMarker.lat === curLat &&
      findMarker.lng === curLng &&
      activeMarker !== null &&
      e.target.dataset
    ) {
      handleActiveMarker(null);
      return;
    }
    //If not, set active marker and
    handleActiveMarker(id);
    //If it's map marker, don't set center
    if (!e) handleSetCenter(findMarker.lat, findMarker.lng);
    else {
      if (!e.target.options) handleSetCenter(findMarker.lat, findMarker.lng);
    }
  };

  useEffect(() => {
    getAllMarkers();
    return () => {
      setMarkers([]);
    };
  }, []);

  const addMarkerToggle = addMarkerComponentVisibility ? (
    <AddMarker
      addMarker={addMarker}
      handleSetCenter={handleSetCenter}
      lat={addMarkerLat ? addMarkerLat : 52}
      lng={addMarkerLng ? addMarkerLng : 21}
      handleAddMarkerElementVisible={handleAddMarkerElementVisible}
      handleMarkerMapActiveItemTEST={handleMarkerMapActiveItemTEST}
    />
  ) : null;

  return (
    <>
      <main className="logged__wrap">
        <MapComponent
          handleMarkerMapActiveItemTEST={handleMarkerMapActiveItemTEST}
          activeMarker={activeMarker}
          filterMarkers={filterMarkers}
          editMarker={editMarker}
          curLat={curLat}
          curLng={curLng}
          curZoom={curZoom}
          handleSetCenter={handleSetCenter}
          handleAddMarkerPosition={handleAddMarkerPosition}
        />
        <MarkerList
          handleMarkerMapActiveItemTEST={handleMarkerMapActiveItemTEST}
          activeMarker={activeMarker}
          filterMarkers={filterMarkers}
          handleFilterMarkers={handleFilterMarkers}
          showMarkerList={showMarkerList}
          removeMarker={removeMarker}
        />
        <ContextMenu
          handleAddMarkerElementVisible={handleAddMarkerElementVisible}
        />
        {addMarkerToggle}
      </main>
    </>
  );
};

const MSTP = (state) => {
  return {
    markersAll: state.markers,
  };
};

const MDTP = {
  setMarkers,
};

export default connect(MSTP, MDTP)(MainPageLogged);

// class MainPageLogged extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   static contextType = AppContext;

//   getAllMarkers = async (lat, lng) => {
//     await fetch(`${API}/getAllMarkers`, {
//       headers: {
//         Authorization: `bearer ${sessionStorage.getItem("token")}`,
//       },
//     })
//       .then((e) => {
//         if (e.ok) {
//           return e.json();
//         } else {
//           this.props.logOut();
//           throw Error("You have been logged out");
//         }
//       })
//       .then(async (markers) => {
//         if (sessionStorage.getItem("logged") === "logged") {
//           await this.props.setMarkers(markers.markers);
//           this.updateMarkersStateAndCurrentZoom(markers, lat, lng);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   addMarker = async (e, lat, lng, name, place, description) => {
//     await fetch(`${API}/addMarker`, {
//       method: "POST",
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `bearer ${sessionStorage.getItem("token")}`,
//       },
//       body: JSON.stringify({ lat, lng, name, place, description }),
//     })
//       .then((e) => e.json())
//       .then((e) => {
//         this.getAllMarkers(lat, lng);
//       });
//   };

//   editMarker = async (e) => {
//     const { lat, lng } = e.target._latlng;
//     const { id, name, place, description } = e.target.options;
//     await fetch(`${API}/editMarker`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `bearer ${sessionStorage.getItem("token")}`,
//       },
//       mode: "cors",
//       body: JSON.stringify({
//         markerId: id,
//         name,
//         lat,
//         lng,
//         place,
//         description,
//       }),
//     })
//       .then((e) => {
//         if (e.ok) {
//           return e.json();
//         } else {
//           this.props.logOut();
//         }
//       })
//       .then(async (user) => {
//         this.props.forceUpdateApp();
//         await this.getAllMarkers(lat, lng);
//       });
//   };

//   removeMarker = async (id) => {
//     await fetch(`${API}/removeMarker`, {
//       method: "DELETE",
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `bearer ${sessionStorage.getItem("token")}`,
//       },
//       body: JSON.stringify({ id }),
//     })
//       .then((e) => e.json())
//       .then((e) => {
//         this.getAllMarkers();
//       });
//   };

//   updateMarkersStateAndCurrentZoom = async (user, lat, lng) => {
//     if (this.props.markersAll[0]) {
//       await this.props.setMarkers(user.markers);
//       if (lat && lng) {
//         // this.context.handleSetCenter(lat, lng);
//         return;
//       }
//       // this.context.handleSetCenter(
//       //   this.props.markersAll[0].lat,
//       //   this.props.markersAll[0].lng
//       // );
//     }
//   };

//   handleMarkerListActiveItem = async (e) => {
//     const { markersAll } = this.props;
//     const element = e.target;
//     function findMarkerId(el) {
//       return e.target.parentElement.dataset.markerid === el._id;
//     }
//     const lat = markersAll[markersAll.findIndex(findMarkerId)]
//       ? markersAll[markersAll.findIndex(findMarkerId)].lat
//       : this.context.curLat;
//     const lng = markersAll[markersAll.findIndex(findMarkerId)]
//       ? markersAll[markersAll.findIndex(findMarkerId)].lng
//       : this.context.curLng;
//     if (Array.from(element.classList).includes("marker__item-title")) {
//       this.context.handleSetCenter(lat, lng);
//     }
//     if (
//       (lat === this.context.curLat && lng === this.context.curLng) ||
//       !Array.from(element.parentElement.classList).includes(
//         "marker__item--active"
//       )
//     ) {
//       if (
//         Array.from(element.parentElement.classList).includes("marker__item")
//       ) {
//         if (
//           Array.from(element.parentElement.classList).includes(
//             "marker__item--active"
//           ) &&
//           Array.from(element.classList).includes("marker__item-title")
//         ) {
//           element.parentElement.classList.remove("marker__item--active");
//         } else {
//           document.querySelectorAll(".marker__item").forEach((e) => {
//             e.classList.remove("marker__item--active");
//           });
//           element.parentElement.classList.add("marker__item--active");
//         }
//       }
//     }
//   };

//   handleMarkerMapActiveItem = (e) => {
//     const items = document.querySelectorAll(".marker__item")
//       ? Array.from(document.querySelectorAll(".marker__item"))
//       : null;
//     const markerMap = e.target;
//     this.handleSetCenter(markerMap._latlng.lat, markerMap._latlng.lng);
//     if (items !== null && items !== undefined) {
//       items.forEach((e) => {
//         e.classList.remove("marker__item--active");
//       });
//       if (
//         document.querySelector(`li[data-markerid="${markerMap.options.id}"]`)
//       ) {
//         document
//           .querySelector(`li[data-markerid="${markerMap.options.id}"]`)
//           .classList.add("marker__item--active");
//       }
//     }
//   };

//   componentDidMount() {
//     this.getAllMarkers();
//   }

//   render() {
//     return (
//       <>
//         <AppContext.Consumer>
//           {(props) => {
//             const {
//               addMarkerComponentVisibility,
//               handleAddMarkerElementVisible,
//               addMarkerLat,
//               addMarkerLng,
//               handleAddMarkerPosition,
//               curLat,
//               curLng,
//               curZoom,
//               handleSetCenter,
//             } = props;

//             const addMarkerToggle = addMarkerComponentVisibility ? (
//               <AddMarker
//                 addMarker={this.addMarker}
//                 getAllMarkers={this.getAllMarkers}
//                 lat={addMarkerLat ? addMarkerLat : 52}
//                 lng={addMarkerLng ? addMarkerLng : 21}
//                 handleAddMarkerElementVisible={handleAddMarkerElementVisible}
//                 getMarkersAndUpdateCurrentZoom={
//                   this.getMarkersAndUpdateCurrentZoom
//                 }
//               />
//             ) : null;
//             return (
//               <main className="logged__wrap">
//                 <MapComponent
//                   editMarker={this.editMarker}
//                   curLat={curLat}
//                   curLng={curLng}
//                   curZoom={curZoom}
//                   handleSetCenter={handleSetCenter}
//                   handleMarkerMapActiveItem={this.handleMarkerMapActiveItem}
//                   handleAddMarkerPosition={handleAddMarkerPosition}
//                 />
//                 <MarkerList
//                   forwardMarkerListRef={this.props.forwardMarkerListRef}
//                   removeMarker={this.removeMarker}
//                   handleMarkerListActiveItem={this.handleMarkerListActiveItem}
//                 />
//                 <ContextMenu
//                   handleAddMarkerElementVisible={handleAddMarkerElementVisible}
//                 />
//                 {addMarkerToggle}
//               </main>
//             );
//           }}
//         </AppContext.Consumer>
//       </>
//     );
//   }
// }
