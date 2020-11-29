import React, { Component } from "react";

//Context
import AppLoggedContext from "./AppLoggedContext";
import { defaultValue } from "./AppLoggedContext";

class AppLoggedProvider extends Component {
  state = defaultValue;

  handleLogIn = (token,user,email) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("logged", "logged");
    sessionStorage.setItem("user", user);
    sessionStorage.setItem("email", email);
    this.setState({logIn: true});
  }

  handleLogOut = () => {
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("logged", "unlogged");
    sessionStorage.setItem("user", "");
    sessionStorage.setItem("email", "");
    this.setState({logIn: false, filterMarkers:"", activeHelper:false, activeMarker:null, showMarkerList:true,editMarkerState:false, editLatLng: []});
  }

  handleAddMarkerElementVisible = (type) => {
    switch (type) {
      case "context":
        this.setState({
          addMarkerComponentVisibility: true,
          activeHelper: false,
        });
        break;
      case "submit":
        this.setState({
          addMarkerComponentVisibility: false,
        });
        break;
      default:
        break;
    }
  };

  handleSetCurrentZoom = (lat, lng, zoom) => {
    this.setState({
      curLat: lat,
      curLng: lng,
      curZoom: zoom,
    });
  };

  handleAddMarkerPosition = (lat, lng) => {
    this.setState({
      addMarkerLat: lat,
      addMarkerLng: lng,
    });
  };

  handleSetCenter = (lat, lng, zoom) => {
    if (lat && lng) {
      if (zoom) {
        this.setState({
          curLat: lat,
          curLng: lng,
          curZoom: zoom,
        });
      } else {
        this.setState({
          curLat: lat,
          curLng: lng,
        });
      }
    }
  };

  handleActiveMarker = (id) => {
    this.setState({
      activeMarker: id,
    });
  };

  handleShowMarkerList = () => {
    this.setState((prevState) => ({
      showMarkerList: !prevState.showMarkerList,
    }));
  };

  handleFilterMarkers = (value) => {
    this.setState({
      filterMarkers: value,
    });
  };

  handleActiveHelper = () => {
    this.setState((prevState) => ({
      activeHelper: !prevState.activeHelper,
      addMarkerComponentVisibility: false,
    }));
  };

  handleEditMarkerState=(id,lat,lng)=>{
    this.setState({
      editState: id,
      editLatLng: [lat,lng],
    })
  }

  handleEditLatLng = (lat,lng) => {
    this.setState({
      editLatLng: [lat,lng]
    })
  }

  handleAlertComponentVisibility = (callback,message) => {
    if(!callback) callback=()=>{};
    if(!message) message="";
    this.setState(prevState => ({
      alertComponentVisibility: {visibility: !prevState.alertComponentVisibility.visibility,callback,message},
    }))
  }

  render() {
    return (
      <AppLoggedContext.Provider
        value={{
          handleLogOut: this.handleLogOut,
          handleLogIn:this. handleLogIn,
          addMarkerComponentVisibility: this.state.addMarkerComponentVisibility,
          handleAddMarkerElementVisible: this.handleAddMarkerElementVisible,
          handleSetCurrentZoom: this.handleSetCurrentZoom,
          addMarkerLat: this.state.addMarkerLat,
          addMarkerLng: this.state.addMarkerLng,
          handleAddMarkerPosition: this.handleAddMarkerPosition,
          curLat: this.state.curLat,
          curLng: this.state.curLng,
          curZoom: this.state.curZoom,
          handleSetCenter: this.handleSetCenter,
          activeMarker: this.state.activeMarker,
          handleActiveMarker: this.handleActiveMarker,
          showMarkerList: this.state.showMarkerList,
          handleShowMarkerList: this.handleShowMarkerList,
          filterMarkers: this.state.filterMarkers,
          handleFilterMarkers: this.handleFilterMarkers,
          activeHelper: this.state.activeHelper,
          handleActiveHelper: this.handleActiveHelper,
          editMarkerState:this.state.editState,
          handleEditMarkerState: this.handleEditMarkerState,
          editLatLng: this.state.editLatLng,
          handleEditLatLng: this.handleEditLatLng,
          alertComponentVisibility: this.state.alertComponentVisibility,
          handleAlertComponentVisibility: this.handleAlertComponentVisibility,
        }}
      >
        {this.props.children}
      </AppLoggedContext.Provider>
    );
  }
}

export default AppLoggedProvider;
