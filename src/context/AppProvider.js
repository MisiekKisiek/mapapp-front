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
    })
  }

  handleAddMarkerPosition = (lat, lng) => {
    this.setState({
      addMarkerLat: lat,
      addMarkerLng: lng,
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          addMarkerComponentVisibility: this.state.addMarkerComponentVisibility,
          handleAddMarkerElementVisible: this.handleAddMarkerElementVisible,
          handleSetCurrentZoom: this.handleSetCurrentZoom,
          // addMarkerLat: this.addMarkerLat,
          // addMarkerLng: this.addMarkerLng,
          // handleAddMarkerPosition: this.handleAddMarkerPosition,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
