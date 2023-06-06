import Leaflet from 'leaflet';

export const generateMarker = (lat, lng) => {
    const poligonPointIcon = Leaflet.divIcon({
        className: 'polygon__markericon',
    });
    return Leaflet.marker([lat, lng], { icon: poligonPointIcon });
}
export const generateActiveMarkerIcon = () => {
    return Leaflet.divIcon({
        className: 'polygon__markericon polygon__markericon--active',
    });
}