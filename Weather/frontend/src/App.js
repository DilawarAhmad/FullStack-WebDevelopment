import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const Weather = () => {
  const [city, setCity] = useState("New York");
  const [weatherdata, setWeatherdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = (city) => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000?city=${city}`)
      .then((response) => {
        setWeatherdata(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);
  const handleInput = (e) => {
    setCity(e.target.value);
  };

  let weatherimage;
  if (weatherdata && weatherdata.weather && weatherdata.weather.length > 0) {
    switch (weatherdata.weather[0].main) {
      case "Clear":
        weatherimage = "clear.jpg";
        break;
      case "Rain":
        weatherimage = "rain.jpg";
        break;
      case "Snow":
        weatherimage = "snow.jpg";
        break;
      case "Fog":
        weatherimage = "fog.jpg";
        break;
      case "Clouds":
        weatherimage = "cloud.jpg";
        break;
      case "Thunderstorm":
        weatherimage = "thunder.jpg";
        break;
      default:
        weatherimage = "default.jpg";
    }
  } else weatherimage = "default.jpg";
  return (
    <div>
      <div className="input">
        <input
          type="text"
          name="city"
          className="input-field"
          value={city}
          onChange={handleInput}
          placeholder="Enter city name : "
        />
      </div>

      {loading && <p className="loading">Loading...</p>}
      
      {weatherdata && weatherdata.main && (
        <div>
          <div className="title">
            <h2>Weather Information for {city}</h2>
          </div>

          <div className="container">
            <div className="image-container">
              <img
                className="image"
                src={`/images/${weatherimage}`}
                alt="image not found"
              />
              <div className="details">
                <p>Temperature : {weatherdata.main.temp}°C </p>
                <p>Description: {weatherdata.weather[0].description}</p>
                <p>Wind Speed : {weatherdata.wind.speed}</p>
                <p>Clouds : {weatherdata.clouds.all}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
