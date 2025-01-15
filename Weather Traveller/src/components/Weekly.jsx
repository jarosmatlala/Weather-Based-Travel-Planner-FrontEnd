
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Weekly.css';


const Weekly = () => {
  const location = useLocation();
  const forecastData = location.state?.forecastData;

  console.log("Forecast data received:", forecastData);

  const [selectedDay, setSelectedDay] = useState(null);


  if (!forecastData) {
    return <p>Loading weekly forecast...</p>;
  }

  const cityName = forecastData.city.name;

  const groupByDay = (list) => {
    const days = {};

    list.forEach(item => {
      const date = new Date(item.dt_txt);
      const day = date.toLocaleDateString('en-US', { weekday: 'long' });


      if (!days[day]) {
        days[day] = [];
      }
      days[day].push(item);
    });
    return (days);
  };

  const days = groupByDay(forecastData.list);
  const dayNames = Object.keys(days);

  const handleDayClick = (day) => {
    setSelectedDay(day)
  };


  const suggestActivities = (weather) => {
    const description = weather.weather[0].description;
    const temp = weather.main.temp;

    if (description.includes("rain")) {
      return ["Visit a museum",
        "Read a book at a cozy café", "Watch a movie"];
    }
    else if (description.includes("clear")) {
      return ["Go for a hike", "Have a picnic", "Visit a park"];

    } else if (description.includes("clouds")) { return ["Take a walk", "Explore the city", "Visit a gallery"]; }
    else if (temp < 10) {
      return ["Stay indoors", "Go ice skating", "Visit a library"];

    } else { return ["Explore local shops", "Try a new restaurant", "Attend a workshop"];

     }
    };



    const getHourlyData = (day) => {
       const hourlyData = days[day] || [];
        return hourlyData.map((item) => ({
           ...item,
            activities: suggestActivities(item)
           })); };

    return (

      <div className="Forecast">

        <h1>Weekly Weather Forecast for {cityName}</h1>

        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th></th>
              <th>Temperature</th>
            </tr>
          </thead>
          <tbody>
            {dayNames.map((item, index) => (
              <tr key={index} onClick={() => handleDayClick(item)} style={{ cursor: 'pointer' }}>
                <td>{item}</td>
                <td className="expand">
                  <img src={`http://openweathermap.org/img/wn/${days[item][0].weather[0].icon}@2x.png`} alt="weather icon" />
                </td>
                <td>{days[item][0].main.temp}°C</td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedDay && (
  <div className="HourlyForecast">
    <h2>Hourly Weather for {selectedDay}</h2>
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Icon</th>
          <th>Temperature</th>
          <th>Description</th>
          <th>Activities</th>
        </tr>
      </thead>
      <tbody>
        {getHourlyData(selectedDay).map((item, index) => (
          <tr key={index}>
            <td>{new Date(item.dt_txt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
            <td className="expand">
              <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="weather icon" />
            </td>
            <td>{item.main.temp}°C</td>
            <td>{item.weather[0].description}</td>
            <td>{item.activities.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


      </div>

    );
  };

  export default Weekly;


