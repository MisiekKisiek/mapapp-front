import React, { Component } from "react";
import { connect } from "react-redux";

//Actions
import { getMarkers } from "../actions/markers.action";

//Components
import MapComponent from "./MapComponent";
import MarkerList from "./MarkerList";
import ContextMenu from "./ContextMenu";
import AddMarker from "./AddMarker";

//Tools
import { API } from "../tools/apiPrefixes";

//Context
import AppContext from "../context/AppContext";

class MainPageLogged extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static contextType = AppContext;

  getAllMarkers = async (lat, lng) => {
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
          await this.props.getMarkers(markers.markers);
          this.updateMarkersStateAndCurrentZoom(markers, lat, lng);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addMarker = async (e, lat, lng, name, place, description) => {
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
      .then((e) => {
        this.getAllMarkers(lat, lng);
      });
  };

  editMarker = async (e) => {
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
          this.props.logOut();
        }
      })
      .then(async (user) => {
        this.props.forceUpdateApp();
        await this.getAllMarkers(lat, lng);
      });
  };

  removeMarker = async (id) => {
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
        this.getAllMarkers();
      });
  };

  updateMarkersStateAndCurrentZoom = async (user, lat, lng) => {
    if (this.props.markersAll[0]) {
      await this.props.getMarkers(user.markers);
      if (lat && lng) {
        this.context.handleSetCenter(lat, lng);
        return;
      }
      this.context.handleSetCenter(
        this.props.markersAll[0].lat,
        this.props.markersAll[0].lng
      );
    }
  };

  handleMarkerListActiveItem = async (e) => {
    const { markersAll } = this.props;
    const element = e.target;
    function findMarkerId(el) {
      return e.target.parentElement.dataset.markerid === el._id;
    }
    const lat = markersAll[markersAll.findIndex(findMarkerId)]
      ? markersAll[markersAll.findIndex(findMarkerId)].lat
      : this.context.curLat;
    const lng = markersAll[markersAll.findIndex(findMarkerId)]
      ? markersAll[markersAll.findIndex(findMarkerId)].lng
      : this.context.curLng;
    if (Array.from(element.classList).includes("marker__item-title")) {
      this.context.handleSetCenter(lat, lng);
    }
    if (
      (lat === this.context.curLat && lng === this.context.curLng) ||
      !Array.from(element.parentElement.classList).includes(
        "marker__item--active"
      )
    ) {
      if (
        Array.from(element.parentElement.classList).includes("marker__item")
      ) {
        if (
          Array.from(element.parentElement.classList).includes(
            "marker__item--active"
          ) &&
          Array.from(element.classList).includes("marker__item-title")
        ) {
          element.parentElement.classList.remove("marker__item--active");
        } else {
          document.querySelectorAll(".marker__item").forEach((e) => {
            e.classList.remove("marker__item--active");
          });
          element.parentElement.classList.add("marker__item--active");
        }
      }
    }
  };

  handleMarkerMapActiveItem = (e) => {
    const items = document.querySelectorAll(".marker__item")
      ? Array.from(document.querySelectorAll(".marker__item"))
      : null;
    const markerMap = e.target;
    this.handleSetCenter(markerMap._latlng.lat, markerMap._latlng.lng);
    if (items !== null && items !== undefined) {
      items.forEach((e) => {
        e.classList.remove("marker__item--active");
      });
      if (
        document.querySelector(`li[data-markerid="${markerMap.options.id}"]`)
      ) {
        document
          .querySelector(`li[data-markerid="${markerMap.options.id}"]`)
          .classList.add("marker__item--active");
      }
    }
  };

  componentDidMount() {
    this.getAllMarkers();
  }

  render() {
    return (
      <>
        <AppContext.Consumer>
          {(props) => {
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
            } = props;

            const addMarkerToggle = addMarkerComponentVisibility ? (
              <AddMarker
                addMarker={this.addMarker}
                getAllMarkers={this.getAllMarkers}
                lat={addMarkerLat ? addMarkerLat : 52}
                lng={addMarkerLng ? addMarkerLng : 21}
                handleAddMarkerElementVisible={handleAddMarkerElementVisible}
                getMarkersAndUpdateCurrentZoom={
                  this.getMarkersAndUpdateCurrentZoom
                }
              />
            ) : null;
            return (
              <main className="logged__wrap">
                <MapComponent
                  editMarker={this.editMarker}
                  curLat={curLat}
                  curLng={curLng}
                  curZoom={curZoom}
                  handleSetCenter={handleSetCenter}
                  handleMarkerMapActiveItem={this.handleMarkerMapActiveItem}
                  handleAddMarkerPosition={handleAddMarkerPosition}
                />
                <MarkerList
                  removeMarker={this.removeMarker}
                  handleMarkerListActiveItem={this.handleMarkerListActiveItem}
                />
                <ContextMenu
                  handleAddMarkerElementVisible={handleAddMarkerElementVisible}
                />
                {addMarkerToggle}
              </main>
            );
          }}
        </AppContext.Consumer>
      </>
    );
  }
}

const MSTP = (state) => {
  return {
    markersAll: state.markers,
  };
};

const MDTP = {
  getMarkers,
};

export default connect(MSTP, MDTP)(MainPageLogged);
