const storeFigure = (coordinates) => {
  return fetch('http://localhost:3001/figures', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      information: 'Figure ' + Math.random(),
      coordinates: coordinates,
    })
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
}

export default storeFigure; 