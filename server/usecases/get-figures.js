class GetGeoFiguresUseCase {
    constructor(geoFigureRepository) {
        this.geoFigureRepository = geoFigureRepository;
    }

    async execute() {
        return this.geoFigureRepository.getAll();
    }
}

module.exports = GetGeoFiguresUseCase;