# Objective
Drawing figures on openstreet map.

## Development
To start developing locally, follow these steps

### Execute in the console.

#### Building
```bash
docker-compose -f docker-compose.yaml -f docker-compose.development.yaml build
```
#### Serving
```bash
docker-compose -f docker-compose.yaml  -f docker-compose.development.yaml up -d
```
#### Stoping
```bash
docker-compose -f docker-compose.yaml  -f docker-compose.development.yaml down
```

### Open in the browser the http://localhost:3000

### The backend is accessible under the http://localhost:3001

## Production

### Building
```bash
docker-compose build
```

### Run the Docker containers:
```bash
docker-compose up -d
```

### To stop the containers:
```bash
docker-compose down
```

## To do.
- Create e2e tests.
- Create additional acceptance tests for the frontend components and scenarios. 
- Create additional tests for the backend part.
- Add caching. 
- Add more figures.
- Use env variables, both Frontend and Backend.
- Cover all edge cases which may cause errors. 
- (Missing api's response, wrong data comming from api's, etc.)