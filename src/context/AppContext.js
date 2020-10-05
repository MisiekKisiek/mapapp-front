import React, { createContext } from "react";

const defaultValue = {
  addMarkerComponentVisibility: false,
  handleAddMarkerElementVisible: () => { },
  addMarkerLat: null,
  addMarkerLng: null,
  handleAddMarkerPosition: () => { },
  curLat: 52,
  curLng: 21,
  curZoom: 12,
  handleSetCurrentZoom: () => { },
  activeMarker: null,
  handleActiveMarker: () => { },
};

const AppContext = createContext(defaultValue);

export default AppContext;

export { defaultValue };
