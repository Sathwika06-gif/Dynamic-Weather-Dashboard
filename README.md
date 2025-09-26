
## Dynamic Weather Dashboard

A responsive and modern weather web app built with HTML, CSS, and JavaScript that displays real-time weather information using the OpenWeatherMap API and Geolocation API. It features current weather, a 5-day forecast, light/dark mode, and a dynamic background image.

## Features

1. Search weather by city name
2. Get weather for your current location using Geolocation
3. Shows current temperature, feels like, humidity, and wind speed
4. Displays a 5-day weather forecast
5. Remembers your last searched city with localStorage

## Project Structure
    weather-dashboard/
    ├─ index.html
    ├─ style.css
    ├─ script.js
    └─ images/
      ├─ weather-bg.jpg
      
## Setup Instructions

Follow these steps to run the project locally or deploy it online:
1. Clone the repository
   
       git clone https://github.com/your-username/weather-dashboard.git
   
   cd weather-dashboard

3. Get an OpenWeatherMap API Key

   Go to ---

       https://openweathermap.org/api
Create a free account and navigate to the API Keys section and copy your API key.

4. Add your API key
   
   Open the script.js file and replace the placeholder with your key:

       const API_KEY = "YOUR_API_KEY_HERE";

5. Run the project locally

You can open index.html directly in your browser or use a local server (recommended for testing APIs):

# Using VS Code Live Server extension (recommended)
# OR using Python (if installed):
     python -m http.server 8000
Then visit:
      
      http://localhost:8000


## APIs Used

OpenWeatherMap API – for weather and forecast data

Geolocation API – to detect user’s current location automatically



## Technologies Used

    HTML5 – structure
    CSS3 – styling, layout, responsive design
    JavaScript (ES6+) – API handling, DOM updates
    OpenWeatherMap API – weather data source
    Geolocation API – location detection


🧭 Unit switch (°C ↔ °F)

🧑‍💻 Add hourly forecast data

📊 Add weather charts and graphs
