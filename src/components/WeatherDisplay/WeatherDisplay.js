import React, { useState } from "react";
import "./WeatherDisplay.css";

export default function WeatherDisplay({ apiKey }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCity, setSearchCity] = useState("");

  // Fetch weather by city
  const weatherByCity = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      if (data.cod === "200") {
        setWeatherData(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather by location
  const weatherByCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
            );
            const data = await response.json();
            if (data.cod === "200") {
              setWeatherData(data);
            } else {
              setError(data.message);
            }
          } catch (err) {
            setError("Failed to fetch data. Please try again.");
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError("Unable to access location. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  // Handle search bar input
  const handleSearch = () => {
    if (searchCity.trim() === "") {
      setError("Please enter a city name.");
      return;
    }
    weatherByCity(searchCity);
    setSearchCity(""); // Clear input after search
  };

  // Render weather display
  const renderWeather = () => {
    if (!weatherData) {
      return <p>No data to display. Use the buttons or search bar to find weather information.</p>;
    }

    const { city, list } = weatherData;

    // Current weather
    const currentWeather = list[0];
    const currentIconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;

    // 5-day forecast
    const dailyData = list.filter((_, index) => index % 8 === 0);

    return (
      <div>
        <h2 className="city-name">{city.name}</h2>
        <div className="weather-current">
          <p>{new Date(currentWeather.dt_txt).toLocaleDateString()}</p>
          <img
            src={currentIconUrl}
            alt={currentWeather.weather[0].description}
            className="weather-icon"
          />
          <p>Current: {Math.round(currentWeather.main.temp)}°C</p>
          <p>Feels Like: {Math.round(currentWeather.main.feels_like)}°C</p>
          <p>Humidity: {currentWeather.main.humidity}</p>
          <p>{currentWeather.weather[0].description}</p>
        </div>
        <div className="weather-forecast">
          {dailyData.map((day, index) => {
            const weather = day.weather[0];
            const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

            return (
              <div key={index} className="forecast-day">
                <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                <img src={iconUrl} alt={weather.description} className="weather-icon" />
                <p>Temp: {Math.round(day.main.temp)}°C</p>
                <p>Feels Like: {Math.round(day.main.feels_like)}°C</p>
                <p>Humidity: {day.main.humidity}</p>
                <p>{weather.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="weather-display">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="weather-actions">
        <p>Choose from one these popular world capitals...</p>
        <button onClick={() => weatherByCity("Paris")}>Paris</button>
        <button onClick={() => weatherByCity("London")}>London</button>
        <button onClick={() => weatherByCity("Rome")}>Rome</button>
        <button onClick={() => weatherByCity("Amsterdam")}>Amsterdam</button>
        <button onClick={() => weatherByCity("Vatican City")}>Vatican City</button>
        <button onClick={() => weatherByCity("Berlin")}>Berlin</button>
        <button onClick={() => weatherByCity("Prague")}>Prague</button>
        <button onClick={() => weatherByCity("Vienna")}>Vienna</button>
        <button onClick={() => weatherByCity("Brussels")}>Brussels</button>
        <button onClick={() => weatherByCity("Budapest")}>Budapest</button>
        <button onClick={() => weatherByCity("Madrid")}>Madrid</button>
        <button onClick={() => weatherByCity("Lisbon")}>Lisbon</button>
        <button onClick={() => weatherByCity("Athens")}>Athens</button>
        <button onClick={() => weatherByCity("Copenhagen")}>Copenhagen</button>
        <button onClick={() => weatherByCity("Washington, D.C")}>Washington, D.C.</button>
        <button onClick={() => weatherByCity("Dublin")}>Dublin</button>
        <button onClick={() => weatherByCity("Bangkok")}>Bangkok</button>
        <button onClick={() => weatherByCity("Monaco")}>Monaco</button>
        <button onClick={() => weatherByCity("Stockholm")}>Stockholm</button>
        <button onClick={() => weatherByCity("Singapore")}>Singapore</button>
        <button onClick={weatherByCurrentLocation} className="current-location">
          Get Weather for Current Location
        </button>
      </div>
      <p>Or search for a destination of your choice.</p>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search city..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {renderWeather()}
    </div>
  );
}
