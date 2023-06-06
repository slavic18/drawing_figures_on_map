import FiguresFactory from './../../factories/figuresFactory';

const getAllFigures = () => {
    return fetch('http://localhost:3001/figures')
        .then(response => response.json())
        .then(result => result.map(FiguresFactory.createFigure))
        .catch(error => {
            console.error('Error:', error);
        });
}

export default getAllFigures;