import React, { useState } from "react";

function Xweather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const apiKey = "65348f46488e4541a53170900240206";
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      if (res.ok) {
        const data = await res.json();
        setWeatherData(data);
      } else {
        alert("Failed to fetch data");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to fetch data");
    }
    setLoading(false);
  };

  const WeatherCard = ({ title, data }) => {
    return (
      <div className="weather-card">
        <h3>{title}</h3>
        <p>{data}</p>
      </div>
    );
  };
  return (
    <div>
      <input
        className="search-bar"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter City Name"
      />
      <button onClick={fetchData}>Search</button>
      {loading && <p>Loading Data...</p>}
      {!loading && weatherData && (
        <div className="weather-cards">
          <WeatherCard
            title="Temperature"
            data={`${weatherData.current.temp_c}°C`}
          />
          <WeatherCard
            title="Humidity"
            data={`${weatherData.current.humidity}%`}
          />
          <WeatherCard
            title="Condition"
            data={weatherData.current.condition.text}
          />
          <WeatherCard
            title="Wind Speed"
            data={`${weatherData.current.wind_kph} kph`}
          />
        </div>
      )}
    </div>
  );
}

export default Xweather;
