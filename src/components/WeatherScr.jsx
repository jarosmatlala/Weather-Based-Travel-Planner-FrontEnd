import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './WeatherScr.css';

import search_icon from "../assets/search.png";
import sunny from "../assets/sunny-weather.jpg";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";

const WeatherScr = () => {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [ForecastData, setForecastData] = useState([]);
  const [city, setCity] = useState('');
  const [isCelsius, setIsCelsius] = useState(true);

  const search = async (location) => {
    const appId = "a0580ecd47ebbb66a743ce57ba2ee19f";

    if (!appId) {
      console.error('VITE_APP_ID is not defined');
      return;
    }

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${appId}&units=metric`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        console.log('API response:', data);
      } else {
        console.error('API error:', data.message);
      }

      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${appId}&units=metric`);
      const forecastData = await forecastResponse.json();
      if (forecastResponse.ok){
        setForecastData(forecastData);
        console.log('API respond:', forecastData);
      } else {
        console.error('Forecast API error:', forecastData);
      }

    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    console.log("Component rendering, initiating search for:", city);
    search(city);
    console.log("Forecast data:", ForecastData);
  }, [city]);

  const handleSubmit = () => {
    navigate('/Weekly', { state: { forecastData: ForecastData } });
  }

  const handleFavorites = () => {
    navigate('/Favourites');
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const convertToKelvin = (tempCelsius) => tempCelsius + 273.15;

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search A City By Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <img src={sunny} alt="sunny weather" className='weather-icon' />
      <p className='temperature'>
        {weatherData ? 
          `${isCelsius ? weatherData.main.temp : convertToKelvin(weatherData.main.temp)}°${isCelsius ? 'C' : 'K'}` 
          : 'N/A'
        }
      </p>
      <p className='location'>{city}</p>
      <div className='weather-data'>
        <div className='col'>
          <img src={humidity} alt="humidity"/>
          <div>
            <p>{weatherData ? `${weatherData.main.humidity}%` : 'N/A'}</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='col'>
          <img src={wind} alt="wind speed" />
          <div>
            <p>{weatherData ? `${weatherData.wind.speed} km/h` : 'N:A' }</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      <div className="Main-Body">
        <div>
          <button className="swt-btn" onClick={toggleTemperatureUnit}>Switch</button>
        </div>
        <div>
          <button className='btn' onClick={handleSubmit}>Weekly</button>
        </div>
        <div>
          <button className="btn" onClick={handleFavorites}>Favourites</button>
        </div>
      </div>
    </div>
  );
};

export default WeatherScr;
