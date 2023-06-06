import { wktToGeoJSON } from "@terraformer/wkt";
import Polygon from "../models/polygon";

class FiguresFactory {
    static createFigure(item) {
        const parsedGeoJSON = wktToGeoJSON(item.geometry);
        if (parsedGeoJSON.type === 'Polygon') {
            return new Polygon({
                hash: item.hash,
                coordinates: parsedGeoJSON.coordinates[0],
                backgroundColor: 'green'
            });
        }

        return null;
    }
}

export default FiguresFactory;