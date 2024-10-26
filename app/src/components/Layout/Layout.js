import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{
          height: "60px",
          padding: "0.5rem 1rem",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{ fontSize: "1.25rem" }}>
            Weather Data Monitoring System
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/weather-updates">
                  WeatherUpdates
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="container flex-grow-1 ">{children}</div>

      {/* Footer fixed to the bottom */}

      <footer
        className="bg-light text-center text-lg-start py-2 mt-auto"
        style={{ borderTop: "1px solid #ddd", height: "50px" }}
      >
        <div className="container">
          <p className="text-center mb-0" style={{ fontSize: "0.9rem" }}>
            © 2024 Weather Data Monitoring System. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
