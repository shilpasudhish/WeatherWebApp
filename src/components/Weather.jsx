import React from "react";
import "./weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

import { useState, useEffect } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  /*const [weatherdata, setWeatherdata] = useState(null);*/
  const [error, setError] = useState(""); // stores error message if any
  const [Data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // state to track loading status
  const [currentweather, setCurrentWeather] = useState(null);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": humidity_icon,
    "09n": humidity_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": drizzle_icon,
    "11n": drizzle_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=33c39443b852ec366e65e975d3dd2032`;
  const getweather = () => {
    if (city === "") {
      setError("Please enter a city name.");
      setData(null); // Reset previous weather data
      return;
    }
    setLoading(true); // Set loading state to true
    setError(""); // Reset error message

    fetch(weatherAPI)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod !== 200) {
          setError("City not found. Please check the name.");
          setData(null); // Reset if city is not found
        } else {
          const icon = allIcons[data.weather[0].icon] || clear_icon;
          setData({
            humidity: data.main.humidity,
            location: data.name,
            windSpeed: data.wind.speed,
            temprature: Math.floor(data.main.temp),
            icon: icon,
          });
        }
      })
      .catch((error) => {
        setError("Error fetching the data. Please try again later.");
        setData(null); // Reset on error
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after fetching is done
      });
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locationAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=33c39443b852ec366e65e975d3dd2032`;
        fetch(locationAPI)
          .then((response) => response.json())
          .then((data) => setCurrentWeather(data));
      });
    }
  }, []);
  return (
    <div className="weather">
      {/* Current Location Weather Section */}
      {currentweather && (
        <div className="current-location-weather">
          <h3>Current Location</h3>
          <div className="current-weather-info">
            <img
              src={`http://openweathermap.org/img/wn/${currentweather.weather[0].icon}.png`}
              alt="weather icon"
              className="weather-icon"
            />
            <div className="weather-details">
              <p className="temp">{Math.floor(currentweather.main.temp)}°C</p>
              <p className="location-current">{currentweather.name}</p>
            </div>
          </div>
        </div>
      )}
      {/* Fetch weather by city */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="search"
          onChange={(e) => setCity(e.target.value)}
        />
        <img src={search_icon} alt="search" onClick={getweather} />
      </div>
      {loading && <p className="loading">Loading...</p>}{" "}
      {/* Show loading indicator */}
      {error && <p className="error">{error}</p>}{" "}
      {/* Show error message if any */}
      {/* Display weather information when data is fetched */}
      {Data && (
        <>
          <img src={Data.icon} alt="" className="weather-icon" />
          <p className="temprature">{Data.temprature}°C</p>
          <p className="location">{Data.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{Data.humidity}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{Data.windSpeed}km/hr</p>
                <span>Wind</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
