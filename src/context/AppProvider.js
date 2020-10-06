import React, { Component } from "react";

import AppContext from "./AppContext";
import { defaultValue } from "./AppContext";

class AppProvider extends Component {
  state = defaultValue;

  handleAddMarkerElementVisible = (type) => {
    switch (type) {
      case "context":
        this.setState((prevState) => ({
          addMarkerComponentVisibility: true,
        }));
        break;
      case "submit":
        this.setState((prevState) => ({
          addMarkerComponentVisibility: false,
        }));
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
    this.setState({
      curLat: lat,
      curLng: lng,
      curZoom: zoom,
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
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
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
