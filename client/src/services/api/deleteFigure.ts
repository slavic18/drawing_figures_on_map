const deletePolygon = (hash) => {
    return fetch('http://localhost:3001/figures/' + hash, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Error:', error);
        });
}

export default deletePolygon;