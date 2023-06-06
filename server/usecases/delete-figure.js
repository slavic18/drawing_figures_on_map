
class DeleteGeoFigureUseCase {
    constructor(geoFigureRepository) {
        this.geoFigureRepository = geoFigureRepository;
    }

    async execute(hash) {
        if (typeof hash !== 'string') {
            throw new Error('invalid hash format');
        }
        // replace with a correct validator.
        if (hash === 'undefined') {
            throw new Error('invalid hash format');
        }

        return this.geoFigureRepository.deleteOne(hash);
    }
}

module.exports = DeleteGeoFigureUseCase;