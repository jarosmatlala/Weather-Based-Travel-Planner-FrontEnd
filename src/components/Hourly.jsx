import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Hourly = () => {
  const { day } = useParams();
  const location = useLocation();
  const hourlyData = location.state?.forecastData;

  if (!hourlyData) {
    return <p>Loading hourly forecast...</p>;
  }

  return (
    <div>
      <h1>Hourly Forecast for {day}</h1>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Icon</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          {hourlyData.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.dt_txt).toLocaleTimeString()}</td>
              <td>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="weather icon"
                />
              </td>
              <td>{item.main.temp}°C</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Hourly;
