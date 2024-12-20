const apiUrl = 'http://localhost:3000/api/weather/';


function getWeather() {
    const location = document.getElementById('locationInput').value;
    
    fetch(`${apiUrl}${location}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data); // Handle displaying weather data
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching weather data. Please try again.');
        });
}
