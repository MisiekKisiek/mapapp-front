import React, { createContext } from "react";

const defaultValue = {
  addMarkerComponentVisibility: false,
  handleAddMarkerElementVisible: () => {},
  addMarkerLat: 51,
  addMarkerLng: 22,
  handleAddMarkerPosition: () => {},
  curLat: 52,
  curLng: 21,
  curZoom: 12,
  handleSetCenter: () => {},
  activeMarker: null,
  handleActiveMarker: () => {},
  showMarkerList: true,
  handleShowMarkerList: () => {},
  filterMarkers: "",
  handleFilterMarkers: () => {},
};

const AppContext = createContext(defaultValue);

export default AppContext;

export { defaultValue };
