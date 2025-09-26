
🌦️ Dynamic Weather Dashboard

A responsive and modern weather web app built with HTML, CSS, and JavaScript that displays real-time weather information using the OpenWeatherMap API and Geolocation API. It features current weather, a 5-day forecast, light/dark mode, and a dynamic background image.

🚀 Features

🌍 Search weather by city name

📍 Get weather for your current location using Geolocation

📊 Shows current temperature, feels like, humidity, and wind speed

📅 Displays a 5-day weather forecast

🌓 Light/Dark theme toggle

🖼️ Background image support (static or dynamic)

💾 Remembers your last searched city with localStorage

📁 Project Structure
weather-dashboard/
├─ index.html
├─ style.css
├─ script.js
└─ images/
   ├─ weather-bg.jpg
   └─ weather-bg-dark.jpg

🛠️ Setup Instructions

Follow these steps to run the project locally or deploy it online:

1. Clone the repository
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard

2. Get an OpenWeatherMap API Key

Go to https://openweathermap.org/api

Create a free account and navigate to the API Keys section.

Copy your API key.

3. Add your API key

Open the script.js file and replace the placeholder with your key:

const API_KEY = "YOUR_API_KEY_HERE";

4. Run the project locally

You can open index.html directly in your browser.
Or use a local server (recommended for testing APIs):

# Using VS Code Live Server extension (recommended)
# OR using Python (if installed):
python -m http.server 8000


Then visit:

http://localhost:8000

5. (Optional) Deploy to GitHub Pages

Push the project to a GitHub repository.

Go to Settings → Pages → Deploy from branch → main (root).

After a few minutes, your live weather dashboard will be available online 🎉.

🖼️ Adding a Background Image

Save your image in the images/ folder (e.g., weather-bg.jpg).

The background is automatically applied from style.css.

For dark mode, you can also add weather-bg-dark.jpg for a better theme look.

You can also extend the project to change the background dynamically based on weather conditions (e.g., sunny, cloudy, rainy) by editing the renderCurrentWeather() function in script.js.

🌐 APIs Used

OpenWeatherMap API
 – for weather and forecast data

Geolocation API – to detect user’s current location automatically

📱 Responsive Design

The dashboard is fully responsive and works on:

✅ Desktop

✅ Tablets

✅ Mobile devices

✨ Demo (Optional)

If you deployed using GitHub Pages, add your live link here:

👉 Live Demo: https://your-username.github.io/weather-dashboard/

🧑‍💻 Technologies Used

HTML5 – structure

CSS3 – styling, layout, responsive design

JavaScript (ES6+) – API handling, DOM updates

OpenWeatherMap API – weather data source

Geolocation API – location detection

📜 License

This project is open-source and available under the MIT License
.

💡 Future Improvements (Optional Ideas)

🌅 Dynamic backgrounds for different weather conditions

🧭 Unit switch (°C ↔ °F)

🧑‍💻 Add hourly forecast data

📊 Add weather charts and graphs
