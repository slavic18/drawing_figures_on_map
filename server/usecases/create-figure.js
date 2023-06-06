// could use dependency injection instead. 
const Joi = require('joi');
const generateUniqueHash = require('./../utils/generate-hash');

class CreateGeoFigureUseCase {
    constructor(geoFigureRepository) {
        this.geoFigureRepository = geoFigureRepository;
        this.geoFigureSchema = Joi.object({
            coordinates: Joi.array().items(Joi.array().length(2).items(Joi.number()).required()),
            information: Joi.string().allow('')
        });
    }

    async execute(geoFigure) {
        const { error } = this.geoFigureSchema.validate(geoFigure);

        if (error) {
            throw new Error(error);
        }

        const validatedGeoFigure = {
            hash: generateUniqueHash(),
            coordinates: geoFigure.coordinates,
            formattedCoordinates: geoFigure.coordinates.map(point => point.join(' ')).join(', '),
            information: geoFigure.information,
            figureType: 'POLYGON',
        }

        const result = await this.geoFigureRepository.create(validatedGeoFigure);
        if (!result) {
            throw new Error('Failed to save the geo figure');
        }

        return {
            hash: validatedGeoFigure.hash,
        }
    }
}

module.exports = CreateGeoFigureUseCase;