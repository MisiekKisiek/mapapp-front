import { Icon, Point } from 'leaflet';

const icon = new Icon({
    iconUrl: require('../img/marker.svg'),
    iconRetinaUrl: require('../img/marker.svg'),
    iconAnchor: [0, 40],
    popupAnchor: [0, 0],
    iconSize: new Point(40, 40),
    className: 'leaflet-div-icon'
});

export { icon };