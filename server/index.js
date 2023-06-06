const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.APPLICATION_PORT;

app.use(express.json());
app.use(cors());

// import usecases dependencies
const GeoFiguresRepository = require('./repositories/figures-repository');
const DatabaseConnection = require('./database/database-connection');

// import use cases; 
const GetGeoFiguresUseCase = require('./usecases/get-figures');
const DeleteGeoFigureUseCase = require('./usecases/delete-figure');
const CreateGeoFigureUseCase = require('./usecases/create-figure');


// Create a database connection instance
const databaseConnection = new DatabaseConnection({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

// Create a repository instance
const geoFigureRepository = new GeoFiguresRepository(databaseConnection);

// Create use case instances
const createGeoFigureUseCase = new CreateGeoFigureUseCase(geoFigureRepository);
const getGeoFiguresUseCase = new GetGeoFiguresUseCase(geoFigureRepository);
const deleteGeoFiguresUseCase = new DeleteGeoFigureUseCase(geoFigureRepository);


app.get('/figures', async (req, res) => {
    try {
        const figures = await getGeoFiguresUseCase.execute();
        return res.status(200).json(figures);
    } catch (e) {
        console.log('Error', e.message);
        res.status(500).json({ error: e.message });
    }
});

app.post('/figures', async (req, res) => {
    try {
        const result = await createGeoFigureUseCase.execute({
            coordinates: req.body.coordinates,
            information: req.body.information
        });

        return res.status(200).json({ hash: result.hash });

    } catch (e) {
        console.log('Error', e.message);
        res.status(500).json({ error: e.message });
    }
});

app.delete('/figures/:id', async (req, res) => {
    try {
        const result = await deleteGeoFiguresUseCase.execute(req.params.id);
        res.status(200).json({});
    } catch (e) {
        console.log('Error', e.message);
        res.status(500).json({ error: e.message });
    }
});

app.listen(port, () => console.log(`Server started at http://localhost:${port}!`))