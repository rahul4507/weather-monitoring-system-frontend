import React from "react";
import DailyWeatherData from "./components/DailyWeatherData/DailyWeatherData";
import WeatherUpdateStream from "./components/WeatherUpdateStream/WeatherUpdateStream";
import Layout from "./components/Layout/Layout"; // Import the Layout component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          {/* Define specific paths for each component */}
          <Route path="/" element={<DailyWeatherData />} /> {/* Home route */}
          <Route
            path="/weather-updates"
            element={<WeatherUpdateStream />}
          />{" "}
          {/* Weather updates route */}
          {/* Add more routes here as needed */}
        </Routes>
      </Layout>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
