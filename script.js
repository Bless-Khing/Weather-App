const apiKey = '2acb9bf87526cee54b5ffb38eaf74f08'; // Replace with your actual OpenWeatherMap API key

document.getElementById('searchButton').addEventListener('click', getWeather);
document.getElementById('currentLocationButton').addEventListener('click', getCurrentLocation);

function getWeather() {
    const location = document.getElementById('locationInput').value;
    
    // Fetch current weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            if (data.cod === '404') {
                alert('City not found');
                return;
            }
            displayWeather(data);
            getForecast(data.coord.lat, data.coord.lon); // Get forecast using coordinates
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching weather data. Please try again.');
        });
}

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;

        // Fetch weather data for current location
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Parse JSON response
            })
            .then(data => {
                displayWeather(data);
                getForecast(latitude, longitude); // Get forecast using coordinates
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('An error occurred while fetching weather data. Please try again.');
            });
    }, () => {
        alert('Unable to retrieve your location.');
    });
}

function displayWeather(data) {
    document.getElementById('location').innerText = data.name;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
    
    // Calculate and display feels like temperature
    const feelsLikeTemp = data.main.feels_like; // Use feels_like from the API response
    document.getElementById('feelsLike').innerText = `Feels Like: ${feelsLikeTemp} °C`;
    
    document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;

   // Convert sunrise and sunset times from UNIX timestamp to human-readable format
   const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
   const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
   document.getElementById('sunrise').innerText = `Sunrise: ${sunriseTime}`;
   document.getElementById('sunset').innerText = `Sunset: ${sunsetTime}`;
}

function getForecast(lat, lon) {
   fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
       .then(response => response.json())
       .then(data => displayForecast(data))
       .catch(error => console.error('Error fetching forecast data:', error));
}

function displayForecast(data) {
   const forecastContainer = document.getElementById('forecast');
   forecastContainer.innerHTML = ''; // Clear previous forecast

   // Loop through the forecast data (every 3 hours)
   for (let i = 0; i < data.list.length; i += 8) { // Get daily forecasts (every 24 hours)
       const dayData = data.list[i];
       const date = new Date(dayData.dt * 1000).toLocaleDateString();
       const temp = dayData.main.temp;

       const forecastDiv = document.createElement('div');
       forecastDiv.classList.add('forecast-day');
       forecastDiv.innerHTML = `
           <strong>${date}</strong><br>
           Temperature: ${temp} °C<br>
           Description: ${dayData.weather[0].description}
       `;
       forecastContainer.appendChild(forecastDiv);
   }
}
