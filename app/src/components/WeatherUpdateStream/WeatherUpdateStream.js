import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const WeatherUpdateStream = () => {
  const [data, setData] = useState({
    labels: [], // Shared time labels for all cities
    datasets: [], // Each city's dataset of temperatures
  });

  const [cityData, setCityData] = useState({});
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
    const newTime = new Date(weatherUpdates[0].created_at).toLocaleTimeString();

    setData((prevData) => {
      const updatedCityData = { ...cityData };

      weatherUpdates.forEach((update) => {
        const { city_name, temp } = update;

        if (!updatedCityData[city_name]) {
          updatedCityData[city_name] = {
            label: city_name,
            borderColor: getRandomColor(),
            data: [],
            fill: false,
            tension: 0.1,
          };
        }

        updatedCityData[city_name].data = [
          ...updatedCityData[city_name].data,
          temp,
        ].slice(-maxDataPoints);
      });

      const updatedLabels = [...prevData.labels, newTime].slice(-maxDataPoints);
      const updatedDatasets = Object.values(updatedCityData);

      setCityData(updatedCityData);

      return {
        labels: updatedLabels,
        datasets: updatedDatasets,
      };
    });
  };

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_SSE_URL}/api/weather-updates/stream/`
    );

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);

        if (
          parsedData.weather_updates &&
          Array.isArray(parsedData.weather_updates)
        ) {
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
      <h2 className="text-center mb-4">🌍 Live Weather Updates by City</h2>
      <Line
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Time",
              },
            },
            y: {
              title: {
                display: true,
                text: "Temperature (°C)",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default WeatherUpdateStream;
