import React, { createContext } from "react";

const defaultValue = {
  addMarkerComponentVisibility: false,
  handleAddMarkerElementVisible: () => {},
};

const AppContext = createContext(defaultValue);

export default AppContext;

export { defaultValue };
