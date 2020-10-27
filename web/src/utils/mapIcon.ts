import Leaflet from 'leaflet';

import mapMarkerImg from '../images/Icon.svg';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,

    iconSize: [55, 65],
    iconAnchor: [29, 65],
    popupAnchor: [170, 10],
});

export default mapIcon;
