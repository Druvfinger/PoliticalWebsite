const apiUrl = "http://localhost:8080/political-parties/4";
const urlBase = "http://localhost:8080/";

fetch(apiUrl, {
    method: 'GET', // GET, POST, PUT, DELETE, etc.
    headers: {
        'Content-Type': 'application/json',
    },
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => console.log(data))
.catch(error => console.error('Fetch error:', error));


