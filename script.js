// Set the base URL for the API depending on the environment
const apiUrl = 'https://bless-weather-app.vercel.app/api/weather/'; // Vercel deployment URL for production
// const apiUrl = 'http://localhost:3000/api/weather/'; // Uncomment this line for local development

function getWeather() {
    const location = document.getElementById('locationInput').value; // Get user input
    fetch(`${apiUrl}${location}`) // Construct the full URL by appending the city name
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            displayWeather(data); // Call function to display weather data on the UI
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching weather data. Please try again.');
        });
}
