class FiguresRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }
    async create(geoFigure) {
        const createdAt = new Date();
        const query = 'INSERT INTO geo_figures (hash, geom, information, created_at, updated_at) VALUES ($1, ST_GeomFromText($2, 4326), $3, $4, $5) RETURNING *';
        const values = [geoFigure.hash, `${geoFigure.figureType}((${geoFigure.formattedCoordinates}))`, geoFigure.information, createdAt, createdAt];

        return this.dbConnection.query(query, values);
    }

    async getAll() {
        const query = 'SELECT hash, ST_AsText(geom) as geometry, information FROM geo_figures';
        return this.dbConnection.query(query);
    }

    async deleteOne(hash) {
        const query = 'DELETE FROM geo_figures WHERE hash = $1';
        const values = [hash];

        return this.dbConnection.query(query, values);
    }
}

module.exports = FiguresRepository;