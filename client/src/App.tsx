import React from 'react';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

import Map from './components/Map';
import FigureModel from './models/polygon';
import Figure from './components/Figure';
import MapFigureComposer from './components/MapFigureComposer';

interface IFigureInformation {
  hash: string;
  coordinates: Leaflet.LatLngTuple[],
}

export const App = ({
  deleteFigure,
  getAllFigures,
  storeFigure }) => {
  const mapLeafletRef = React.useRef<undefined | Leaflet.Map>(undefined);
  const [figures, setFigures] = React.useState<FigureModel[]>([]);
  const [figureInformation, setFigureInformation] = React.useState<IFigureInformation | null>(null)

  // init map
  React.useEffect(() => {
    getAllFigures().then(setFigures);
  }, []);

  const onFigureClick = React.useCallback((hash, coordinates) => {
    setFigureInformation({ hash, coordinates });
  }, []);

  const onFigureDoubleClick = React.useCallback((hash) => {
    deleteFigure(hash).then(() => {
      setFigures(figures => {
        figures = figures.filter(figure => figure.hash !== hash);
        return figures;
      });
      setFigureInformation(null);
    });
  }, []);

  const onFinishDrawingFigure = (figure) => {
    const coordinates = figure.coordinates;
    coordinates.push(coordinates[0]); // Close the polygon
    storeFigure(coordinates).then(result => {
      setFigures(prevfigures => {
        const figure = new FigureModel({
          hash: result.hash,
          coordinates: coordinates,
          backgroundColor: 'green'
        });

        return [...prevfigures, figure];
      })
    });
  }
  const showFigures = mapLeafletRef.current && figures.length > 0;
  return (
    <div className='map__wrapper'>
      <Map mapLeafletRef={mapLeafletRef} />
      {showFigures ? figures.map(
        (figure) =>
          <Figure
            key={figure.hash}
            leafletMapIntance={mapLeafletRef.current}
            figure={figure} onFigureClick={onFigureClick}
            onFigureDoubleClick={onFigureDoubleClick} />
      ) : null}
      {mapLeafletRef.current ? <MapFigureComposer onFinishDrawingFigure={onFinishDrawingFigure} leafletMapIntance={mapLeafletRef.current} /> : null}
      {figureInformation ?
        <div className='map__figureinformation' >
          <p>HASH: {figureInformation.hash}</p>
          <p>Polygon coordinates: {figureInformation.coordinates.join(' ')}</p>
        </div> : null}
    </div>
  )
};