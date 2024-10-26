import React, { useEffect, useState } from "react";
import "./DailyWeatherData.css"; // Custom styles for better visuals

const weatherIcons = {
  Haze: "🌫️",
  Smoke: "💨",
  Clear: "☀️",
  Rain: "🌧️",
  Clouds: "☁️",
  // Add more icons for different weather conditions if necessary
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Format the date to "Month Day, Year Hours:Minutes:Seconds"
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return date.toLocaleDateString("en-US", options);
};

const DailyWeatherData = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      process.env.REACT_APP_SSE_URL + "/api/weather/daily-summary/stream"
    );

    // When a message is received, update the weather data
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data).daily_summaries;
      setWeatherData((prevData) => {
        // Here we could merge or replace the data based on your needs
        return newData; // Replace the existing data with the new data
      });
    };

    // Optional: Handle errors from the EventSource
    eventSource.onerror = (error) => {
      eventSource.close(); // Close the connection on error
    };

    // Clean up the EventSource on component unmount
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="weather-container container my-4">
      <h2 className="text-center mb-4">🌍 Live Weather Updates</h2>
      <div className="row">
        {weatherData.map((weather, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card weather-card shadow-lg text-center">
              <div className="card-header bg-primary text-white">
                <h5 className="city-name">{weather.city_name}</h5>
              </div>
              <div className="card-body">
                <div className="weather-icon">
                  <span style={{ fontSize: "2rem" }}>
                    {weatherIcons[weather.dominant_weather] || "❓"}
                  </span>
                </div>
                <p className="card-text date">📅 {formatDate(weather.date)}</p>
                <div className="temp-container">
                  <p className="temp avg-temp">
                    🌡️ Avg Temp: {weather.avg_temp.toFixed(2)}°C
                  </p>
                  <p className="temp min-temp">
                    ⬇️ Min Temp: {weather.min_temp.toFixed(2)}°C
                  </p>
                  <p className="temp max-temp">
                    ⬆️ Max Temp: {weather.max_temp.toFixed(2)}°C
                  </p>
                </div>
                <p className="card-text weather-type">
                  Weather: {weather.dominant_weather}
                </p>
              </div>
              <div className="card-footer text-muted">
                Updated On: {formatDate(weather.date)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyWeatherData;
