import React, { useState } from 'react';
import axios from 'axios';
// import './weather.css';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=YOUR_API_KEY&units=metric`);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching the weather data', error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Weather App</h1>
      <input 
        type="text" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
        placeholder="Enter location" 
        className="input"
      />
      <button onClick={fetchWeather} className="button">Get Weather</button>
      {weatherData && (
        <div className="weatherInfo">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Wind Direction: {weatherData.wind.deg} °</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
