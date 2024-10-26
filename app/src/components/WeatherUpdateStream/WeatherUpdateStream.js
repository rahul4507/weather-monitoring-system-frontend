import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const WeatherUpdateStream = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });

  const [cityData, setCityData] = useState({});
  const cityColors = {}; // Store each city's color here
  const maxDataPoints = 10;

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    return (
      "#" +
      Array.from(
        { length: 6 },
        () => letters[Math.floor(Math.random() * 16)]
      ).join("")
    );
  };

  const processWeatherUpdate = (weatherUpdates) => {
    const newData = { ...cityData };

    weatherUpdates.forEach((update) => {
      const { city_name, temp, created_at } = update;
      const timeLabel = new Date(created_at).toLocaleTimeString();

      if (!newData[city_name]) {
        // If the city is not yet in cityColors, assign a fixed color
        if (!cityColors[city_name]) {
          cityColors[city_name] = getRandomColor();
        }

        newData[city_name] = {
          label: city_name,
          borderColor: cityColors[city_name],
          backgroundColor: "transparent",
          data: [],
          fill: false,
          tension: 0.1,
        };
      }

      // Add temperature data and limit the data points
      newData[city_name].data = [
        ...newData[city_name].data,
        { x: timeLabel, y: temp },
      ].slice(-maxDataPoints);
    });

    const allLabels = Object.values(newData)
      .flatMap((city) => city.data.map((point) => point.x))
      .slice(-maxDataPoints);

    setCityData(newData);
    setData({
      labels: [...new Set(allLabels)], // Unique, ordered labels
      datasets: Object.values(newData),
    });
  };

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_SSE_URL}/api/weather-updates/stream/`
    );

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);

        if (Array.isArray(parsedData.weather_updates)) {
          processWeatherUpdate(parsedData.weather_updates);
        } else {
          console.error("Unexpected data format:", parsedData);
        }
      } catch (error) {
        console.error("Error parsing weather update:", error);
      }
    };

    eventSource.onerror = () => {
      console.error("SSE connection encountered an error.");
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return (
    <div className="weather-container container my-4">
      <h2 className="text-center mb-4">🌍 Live Weather Updates</h2>
      <Line
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
          },
          scales: {
            x: {
              type: "category",
              title: { display: true, text: "Time" },
            },
            y: {
              title: { display: true, text: "Temperature (°C)" },
            },
          },
        }}
      />
    </div>
  );
};

export default WeatherUpdateStream;
