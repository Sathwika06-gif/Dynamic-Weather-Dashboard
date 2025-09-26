// script.js
// Replace with your OpenWeatherMap API key:
const API_KEY = "fb1a2b547d7b356025327d66ee07c0ba"; // <-- REPLACE THIS



// DOM elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const geoBtn = document.getElementById('geo-btn');
const messageEl = document.getElementById('message');
const currentEl = document.getElementById('current');
const forecastEl = document.getElementById('forecast');
const themeToggle = document.getElementById('theme-toggle');

function setMessage(text, isError = false) {
  messageEl.textContent = text;
  messageEl.style.color = isError ? '#ff4d4f' : '';
}

function clearMessage() { messageEl.textContent = ''; }

function setLoading(isLoading) {
  if (isLoading) {
    currentEl.innerHTML = '<div class="placeholder">Loading…</div>';
    forecastEl.innerHTML = '';
  }
}

// Format date string (YYYY-MM-DD) to "Mon, 12 Aug"
function formatDateDisplay(ymd) {
  const d = new Date(ymd);
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

// Render current weather card
function renderCurrentWeather(data) {
  const icon = data.weather?.[0]?.icon;
  const description = data.weather?.[0]?.description ?? '--';
  const temp = Math.round(data.main.temp);
  const feels = Math.round(data.main.feels_like);
  const min = Math.round(data.main.temp_min);
  const max = Math.round(data.main.temp_max);
  const humidity = data.main.humidity;
  const wind = data.wind?.speed;

  const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@4x.png` : '';

  currentEl.innerHTML = `
    <div class="current-left">
      <img src="${iconUrl}" alt="${description}" onerror="this.style.display='none'"/>
      <div>
        <div class="location">${data.name}, ${data.sys?.country ?? ''}</div>
        <div class="small meta">${description}</div>
      </div>
    </div>

    <div style="text-align:right">
      <div class="temp">${temp}°C</div>
      <div class="small meta">Feels like ${feels}°C • H: ${max}° • L: ${min}°</div>
      <div class="small meta">Humidity: ${humidity}% • Wind: ${wind} m/s</div>
    </div>
  `;
}

// Render 5-day forecast (from 3-hourly forecast choose midday if possible)
function renderForecast(forecastData) {
  // forecastData.list: array of 3-hour entries
  // Group by date
  const byDate = {};
  for (const item of forecastData.list) {
    const date = item.dt_txt.split(' ')[0];
    if (!byDate[date]) byDate[date] = [];
    byDate[date].push(item);
  }

  // Build an array of next 5 days (skip today if it's partial and user already sees current)
  const dates = Object.keys(byDate).slice(0, 6); // take a bit extra
  const todayISO = new Date().toISOString().split('T')[0];
  // Choose dates that are not today (prefer next days), but include today if only option
  const nextDates = dates.filter(d => d !== todayISO).slice(0, 5);
  if (nextDates.length === 0 && dates.length > 0) nextDates.push(dates[0]);

  forecastEl.innerHTML = ''; // clear

  for (const date of nextDates) {
    const items = byDate[date];
    // prefer the item at 12:00:00
    let pick = items.find(i => i.dt_txt.includes('12:00:00')) || items[Math.floor(items.length / 2)];
    const icon = pick.weather?.[0]?.icon;
    const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : '';
    const temp = Math.round(pick.main.temp);
    const desc = pick.weather?.[0]?.description ?? '';
    const dateDisplay = formatDateDisplay(date);

    const card = document.createElement('div');
    card.className = 'forecast-card';
    card.innerHTML = `
      <div class="small">${dateDisplay}</div>
      <img src="${iconUrl}" alt="${desc}" onerror="this.style.display='none'"/>
      <div style="font-weight:600">${temp}°C</div>
      <div class="small">${desc}</div>
    `;
    forecastEl.appendChild(card);
  }
}

// Fetch weather using coordinates (lat, lon)
async function fetchWeatherByCoords(lat, lon) {
  if (!API_KEY || API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
    setMessage('Please set your OpenWeatherMap API key in script.js', true);
    return;
  }
  setLoading(true);
  clearMessage();
  try {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    const [currentRes, forecastRes] = await Promise.all([fetch(currentUrl), fetch(forecastUrl)]);
    if (!currentRes.ok) throw new Error('Failed to fetch current weather (status ' + currentRes.status + ')');
    if (!forecastRes.ok) throw new Error('Failed to fetch forecast (status ' + forecastRes.status + ')');

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    // render
    renderCurrentWeather(currentData);
    renderForecast(forecastData);
    // save last city
    if (currentData.name) localStorage.setItem('lastCity', currentData.name);
  } catch (err) {
    setMessage(err.message || 'Error fetching weather', true);
    currentEl.innerHTML = '<div class="placeholder">Unable to load data</div>';
    forecastEl.innerHTML = '';
  } finally {
    // small delay so UI feels smooth
    setTimeout(() => {}, 100);
  }
}

// Fetch by city name
async function fetchWeatherByCity(city) {
  if (!city) return;
  if (!API_KEY || API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
    setMessage('Please set your OpenWeatherMap API key in script.js', true);
    return;
  }
  setLoading(true);
  clearMessage();
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) throw new Error('City not found. Check spelling.');
      else throw new Error('Failed to fetch city weather (status ' + res.status + ')');
    }
    const data = await res.json();
    renderCurrentWeather(data);

    // fetch forecast using coordinates
    const { lat, lon } = data.coord;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const forecastRes = await fetch(forecastUrl);
    if (forecastRes.ok) {
      const forecastData = await forecastRes.json();
      renderForecast(forecastData);
    } else {
      forecastEl.innerHTML = '';
    }
    localStorage.setItem('lastCity', data.name);
  } catch (err) {
    setMessage(err.message, true);
    currentEl.innerHTML = '<div class="placeholder">No results</div>';
    forecastEl.innerHTML = '';
  }
}

// Geolocation handler
function useMyLocation() {
  if (!navigator.geolocation) {
    setMessage('Geolocation is not supported by your browser', true);
    return;
  }
  setMessage('Requesting location…');
  setLoading(true);
  navigator.geolocation.getCurrentPosition(
    position => {
      clearMessage();
      const { latitude, longitude } = position.coords;
      fetchWeatherByCoords(latitude, longitude);
    },
    err => {
      setMessage('Could not get location: ' + (err.message || 'permission denied'), true);
      setLoading(false);
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle('dark');
}
themeToggle.addEventListener('click', toggleTheme);

// form handlers
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const q = searchInput.value.trim();
  if (!q) {
    setMessage('Type a city name to search', true);
    return;
  }
  fetchWeatherByCity(q);
});

geoBtn.addEventListener('click', () => {
  useMyLocation();
});

// On load: if last city saved, show that; else try geolocation
window.addEventListener('DOMContentLoaded', () => {
  const last = localStorage.getItem('lastCity');
  if (last) {
    fetchWeatherByCity(last);
  } else {
    // try geolocation but do not force if user denies
    if ('geolocation' in navigator) {
      // optionally ask user — here we'll try once
      try {
        navigator.geolocation.getCurrentPosition(
          pos => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
          () => {} // ignore if denied
        );
      } catch (e) { /* ignore */ }
    }
  }
});
