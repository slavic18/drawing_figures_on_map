import React from 'react';

const Figure = ({ leafletMapIntance, onFigureClick, onFigureDoubleClick, figure }) => {
    React.useEffect(() => {
        // add the figure to the map
        figure.polygon.addTo(leafletMapIntance);

        // register the event listeners
        figure.polygon.on('click', onFigureClick.bind(null, figure.hash, figure.coordinates));
        figure.polygon.on('dblclick', onFigureDoubleClick.bind(null, figure.hash));

        return () => {
            figure.polygon!.off('click', onFigureClick);
            figure.polygon!.off('dblclick', onFigureDoubleClick);
            leafletMapIntance.removeLayer(figure.polygon!);
        }
    }, []);

    return null;
}
export default Figure;