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

  render() {
    return (
      <AppContext.Provider
        value={{
          addMarkerComponentVisibility: this.state.addMarkerComponentVisibility,
          handleAddMarkerElementVisible: this.handleAddMarkerElementVisible,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
