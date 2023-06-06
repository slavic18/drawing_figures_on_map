import React from 'react';
import Leaflet from 'leaflet';
import { PolygonState } from '../../models/polygon';
import Figure from './../../models/polygon';
import { generateActiveMarkerIcon, generateMarker } from './utils';

enum ApplicationState {
    INITIAL = 'INITIAL',
    START_DRAWING = 'START_DRAWING',
    FINISHED_DRAWING = 'FINISHED_DRAWING',
};

const MapFigureComposer = ({ leafletMapIntance, onFinishDrawingFigure }) => {
    const [applicationState, setApplicationState] = React.useState(ApplicationState.INITIAL);
    const [figure, setFigure] = React.useState<Figure | null>(null);
    React.useEffect(() => {
        if (applicationState === ApplicationState.START_DRAWING) {
            // register events listeners.
            leafletMapIntance.on('click', onMapClick);
            // create a new figure
            const figure = new Figure({
                hash: undefined,
                state: PolygonState.DRAWING,
                coordinates: [],
                backgroundColor: 'blue',
            });
            setFigure(figure);
            // draw the new figure.
            figure.polygon.addTo(leafletMapIntance);
        }

        if (applicationState === ApplicationState.FINISHED_DRAWING) {
            if (figure) {
                finishDrawingFigure(figure);
            }
            // deregister events listeners.
            leafletMapIntance!.off('click', onMapClick);
        }
    }, [applicationState]);

    const onMapClick = React.useCallback((event) => {
        const { lat, lng } = event.latlng;
        setFigure(figure => {
            if (figure && figure.state === PolygonState.DRAWING) {
                const coordinates: Leaflet.LatLngTuple[] = [...figure.coordinates, [lat, lng]];
                figure.polygon!.setLatLngs(coordinates);

                const marker = generateMarker(lat, lng).addTo(leafletMapIntance);
                const markers = [...figure.markers, marker];

                if (markers.length === 1) {
                    markers[0].on('click', onFirstMarkerClick);
                }
                if (markers.length === 3) {
                    markers[0].setIcon(generateActiveMarkerIcon());
                }
                figure.markers = markers;
                figure.coordinates = coordinates;
            }

            return figure;
        });
    }, []);

    const onFirstMarkerClick = () => {
        setFigure(figure => {
            // check if there are more than 3 markers
            if (!figure || !figure.markers || !leafletMapIntance) {
                return figure;
            }
            if (figure && figure.markers && figure.markers.length < 2) {
                return figure;
            }
            finishDrawingFigure(figure);


            return figure;
        });
    };

    const onDrawButtonClick = () => {
        setApplicationState(ApplicationState.START_DRAWING);
    }

    const onStopDrawingButtonClick = () => {
        setApplicationState(ApplicationState.FINISHED_DRAWING);
    };

    const finishDrawingFigure = (figure) => {
        // remove markers.
        figure.markers.forEach(marker => {
            // deregister the events;
            marker.off('click', onFirstMarkerClick);
            leafletMapIntance.removeLayer(marker);
        });

        // remove the polygon from the map.
        leafletMapIntance.removeLayer(figure.polygon);
        // reset the polygon state
        const newFigure = new Figure({
            hash: undefined,
            state: PolygonState.DRAWING,
            coordinates: [],
            backgroundColor: 'blue',
        });

        newFigure.polygon.addTo(leafletMapIntance!);

        // store the empty polygon to the state for future drawing.
        setFigure(newFigure);
        // callback to the parent component
        onFinishDrawingFigure(figure);
    }

    return (
        <div className='map__buttons'>
            <button onClick={onDrawButtonClick}>Draw</button>
            <button onClick={onStopDrawingButtonClick}>Stop drawing</button>
        </div>
    )
}

export default MapFigureComposer;