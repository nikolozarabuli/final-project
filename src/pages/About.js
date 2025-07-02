import React from "react";
import "./About.scss";

function About() {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1 className="about-title">🌤️ Georgian Weather App</h1>
        <p className="about-lead">
          Get real-time weather and a 5-day forecast for major cities of Georgia, with dynamic backgrounds and a beautiful, responsive design.
        </p>
        <div className="about-section">
          <h2>Features</h2>
          <ul>
            <li>🌇 Weather and forecast for 10+ Georgian cities</li>
            <li>🖼️ Backgrounds that match the weather</li>
            <li>🌓 Light &amp; dark mode</li>
            <li>✨ Fast, mobile-friendly interface</li>
          </ul>
        </div>
        <div className="about-section">
          <h2>Built With</h2>
          <ul>
            <li>⚛️ React</li>
            <li>🎨 SCSS</li>
            <li>☁️ <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo API</a></li>
          </ul>
        </div>
        <div className="about-section">
          <h2>About the Author</h2>
          <p>
            Made by <a href="https://github.com/nikolozarabuli" target="_blank" rel="noopener noreferrer">Nikoloz Arabuli</a>
          </p>
        </div>
        <div className="about-section credits">
          <small>
            Icons by <a href="https://twemoji.twitter.com/" target="_blank" rel="noopener noreferrer">Twemoji</a>.<br />
            Weather data by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo</a>.
          </small>
        </div>
      </div>
    </div>
  );
}

export default About;