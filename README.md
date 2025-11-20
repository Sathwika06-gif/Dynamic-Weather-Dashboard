
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
      ├─ Weather-bg.jpg
      
## Setup Instructions

Follow these steps to run the project locally or deploy it online:
1. Clone the repository
   
       git clone https://github.com/Sathwika06-gif/Dynamic-Weather-Dashboard.git
   
       cd Dynamic-Weather-Dashboard
2. Get an OpenWeatherMap API Key

   Go to ---

       https://openweathermap.org/api
   Create a free account and navigate to the API Keys section and copy your API key.

3. Add your API key
   
   Open the script.js file and replace the placeholder with your key:

       const API_KEY = "YOUR_API_KEY_HERE";

4. Run the project
    1. Open Directly in Browser (Quick Test)

           1.This is the simplest way to check your project quickly.
           2.Just double-click the index.html file.
           3.It will open in your default web browser.

      Pros- Works for static files, but some API features (like Geolocation) might not work properly without a server.

   2. Run with a Local Development Server (Recommended)

      A local server ensures APIs, geolocation, and fetch requests all work correctly.

      option A: Using Python (built-in, cross-platform)

        If you have Python installed:

           # Navigate to project folder
              cd weather-dashboard

           # Start a local server (Python 3)
              python -m http.server 8000


      Then open your browser and go to:

          http://localhost:8000

      Option B: Using Node.js http-server

      If you have Node.js installed, you can quickly serve the project with http-server:

          # Install http-server globally (one-time setup)
          npm install -g http-server

          # Run the server
          http-server
      Then visit the link it shows (usually http://localhost:8080).

   3. Using VS Code Live Server Extension (Best Experience)

       If you’re working in Visual Studio Code, this is the easiest way:

       1.Open the project folder in VS Code.
     
       2.Install the extension "Live Server" (by Ritwick Dey).
     
       3.Right-click index.html → "Open with Live Server".
     
       4.Your default browser will open the site (e.g., http://127.0.0.1:5500).

    Pros:

     Auto-refreshes on file save
     Works perfectly with API requests and geolocation
     Easiest option for development


## APIs Used

OpenWeatherMap API – for weather and forecast data

Geolocation API – to detect user’s current location automatically



## Technologies 


    HTML5 – structure
    CSS3 – styling, layout, responsive design
    JavaScript (ES6+) – API handling, DOM updates
    OpenWeatherMap API – weather data source
    Geolocation API – location detection


##OUTPUT-
 ## when we enter the location through keyboard-
<img width="1366" height="768" alt="Screenshot (412)" src="https://github.com/user-attachments/assets/1c1b41bf-1244-4a3d-a229-84e587b5d7e2" />
 ## when current location is detected-
<img width="1366" height="768" alt="Screenshot (413)" src="https://github.com/user-attachments/assets/6cc6a852-8f15-4aff-af48-edc685baef87" />
