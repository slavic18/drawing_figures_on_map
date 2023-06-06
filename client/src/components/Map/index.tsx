import React from 'react';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ mapLeafletRef }) => {
    const mapNodeRef = React.useRef(null);
    React.useEffect(() => {
        if (mapNodeRef.current !== null) {
            let map = Leaflet.map(mapNodeRef.current, {
                center: [49.8152995, 6.13332],
                zoom: 9,
                doubleClickZoom: false
            });
            mapLeafletRef.current = map;

            // set the tile layer
            Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        };

    }, []);
    return <div ref={mapNodeRef} className='map'></div>;
}
export default Map;