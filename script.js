const apiUrl = 'http://localhost:5000/api/weather/'; // Adjust based on your deployment

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
