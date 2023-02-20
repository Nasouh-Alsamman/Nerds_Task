import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState("");
  const [wind, setWind] = useState(0);
  const [feelsLike, setFeelsLike] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };
  const fetchWeather = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(
        savePositionToState
      );
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=de066d82e486b5da58462b534863eb4e&units=metric`
      );
      setTemperature(res.data.main.temp);
      setCityName(res.data.name);
      setWeather(res.data.weather[0].main);
      setWind(res.data.wind.speed);
      setFeelsLike(res.data.main.feels_like);
      setHumidity(res.data.main.humidity);
      setPressure(res.data.main.pressure);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);

  return (
    <div className="weather">
      <div className="weathercontainer">
        <h1>City Name :{cityName}</h1>
        <h2>Temperature :{temperature} C</h2>
        <h2>Feels like :{feelsLike} C</h2>
        <h2>Weather :{weather}</h2>
        <h2>Wind speed :{wind} Kmps</h2>
        <h2>Humidity :{humidity}</h2>
        <h2>Pressure :{pressure}</h2>
      </div>
    </div>
  );
};

export default Weather;
