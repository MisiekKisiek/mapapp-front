import { Icon, Point } from "leaflet";



const icon = new Icon({
  iconUrl: require("../img/marker.png"),
  iconRetinaUrl: require("../img/marker.png"),
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  iconSize: new Point(40, 40),
  className: "leaflet-div-icon",
});

const iconActive = new Icon({
  iconUrl: require("../img/markerActive.png"),
  iconRetinaUrl: require("../img/markerActive.png"),
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  iconSize: new Point(40, 40),
  className: "leaflet-div-icon",
});

const iconActiveEdit = new Icon({
  iconUrl: require("../img/markerActiveEdit.png"),
  iconRetinaUrl: require("../img/markerActiveEdit.png"),
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  iconSize: new Point(40, 40),
  className: "leaflet-div-icon",
});

export { icon, iconActive, iconActiveEdit };
