import { createContext } from "react";

const defaultValue = {
  logIn: false,
  handleLogOut: ()=>{},
  handleLogIn: ()=>{},
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
  activeHelper: false,
  handleActiveHelper: () => {},
  editMarkerState: false,
  handleEditMarkerState: () => {},
  editLatLng: [],
  handleEditLatLng: ()=>{},
  alertComponentVisibility:{visibility:false, callback:()=>{},message:""},
  handleAlertComponentVisibility: ()=>{},
};

const AppLoggedContext = createContext(defaultValue);

export default AppLoggedContext;

export { defaultValue };
