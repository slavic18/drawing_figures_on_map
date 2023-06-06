import Leaflet from 'leaflet';

export enum PolygonState {
    INITIAL = 'initial',
    DRAWING = 'drawing',
    DRAWED = 'drawed',
    DELETED = 'delete'
}

class Polygon {
    state: PolygonState;
    hash: string | undefined;
    coordinates: Leaflet.LatLngTuple[];
    markers: Leaflet.Marker[];
    polygon: Leaflet.Polygon;

    constructor({ hash, coordinates, backgroundColor, state = PolygonState.INITIAL }) {
        this.hash = hash;
        this.state = state;
        this.coordinates = coordinates;
        this.markers = [];
        this.polygon = Leaflet.polygon(coordinates, { color: backgroundColor })
    }
}

export default Polygon;