# Weather App

A weather app built using **React** that allows users to search for weather details by city, display the current temperature, humidity, wind speed, and other weather data. It also includes a feature to show the current weather based on the user's geolocation.

## Features
- **Search for weather** by city.
- **Current weather** based on your **geolocation**.
- Displays key weather data such as:
  - Temperature (in Celsius)
  - Wind Speed
  - Humidity
  - Weather Icon (based on weather conditions)
- **Responsive Design**: Optimized for mobile and tablet devices.
- **Modern UI** with smooth animations and styling.

## Tech Stack
- **React** (Frontend)
- **OpenWeatherMap API** for weather data
- **Geolocation API** for fetching current location 
- **CSS** for styling

**API Documentation**
The app uses the OpenWeatherMap API to fetch weather data.

For more details on how to use the API, you can visit the official OpenWeatherMap API Documentation.

Important Endpoints:

Weather by City Name:
https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={API_KEY}
Geolocation Weather (currently based on user's location): This will be fetched using the browser's navigator.geolocation API.
