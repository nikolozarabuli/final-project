import React, { useState, useEffect } from "react";
import "./Home.css";

// City coordinates for quick lookup
const cityCoordinates = {
  "Tbilisi": { latitude: 41.7151, longitude: 44.8271 },
  "Batumi": { latitude: 41.6168, longitude: 41.6367 },
  "Kutaisi": { latitude: 42.2500, longitude: 42.7000 },
  "Rustavi": { latitude: 41.5410, longitude: 44.9900 },
  "Zugdidi": { latitude: 42.5111, longitude: 41.8708 },
  "Gori": { latitude: 41.9854, longitude: 44.1108 },
  "Poti": { latitude: 42.1467, longitude: 41.6719 },
  "Telavi": { latitude: 41.9186, longitude: 45.4736 },
  "Akhaltsikhe": { latitude: 41.6395, longitude: 42.9826 },
  "Samtredia": { latitude: 42.1500, longitude: 42.3333 },
};

// Icons and descriptions for weather codes
const weatherIcons = {
  0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️", 45: "🌫️", 48: "🌫️",
  51: "🌦️", 53: "🌦️", 55: "🌧️", 61: "🌧️", 63: "🌧️", 65: "🌧️",
  71: "🌨️", 73: "🌨️", 75: "🌨️", 80: "🌦️", 81: "🌦️", 82: "🌧️",
  95: "⛈️", 96: "⛈️", 99: "⛈️"
};
const weatherDescriptions = {
  0: "მზიანი", 1: "უმეტესად მზიანი", 2: "ნაწილობრივ მოღრუბლული", 3: "ღრუბლიანი",
  45: "ნისლი", 48: "ნისლი",
  51: "მსუბუქი ჟონვა", 53: "საშუალო ჟონვა", 55: "მძლავრი ჟონვა",
  61: "მსუბუქი წვიმა", 63: "საშუალო წვიმა", 65: "მძლავრი წვიმა",
  71: "მსუბუქი თოვა", 73: "საშუალო თოვა", 75: "მძლავრი თოვა",
  80: "მსუბუქი წვიმა", 81: "საშუალო წვიმა", 82: "ძლიერი წვიმა",
  95: "ელჭექი", 96: "ელჭექი", 99: "ძლიერი ელჭექი"
};

function getWeatherIcon(code) {
  return weatherIcons[code] || "❓";
}
function getWeatherDescription(code) {
  return weatherDescriptions[code] || "უცნობი";
}
function formatDate(dateString) {
  const date = new Date(dateString);
  const days = ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"];
  const months = [
    "იანვარი","თებერვალი","მარტი","აპრილი","მაისი","ივნისი",
    "ივლისი","აგვისტო","სექტემბერი","ოქტომბერი","ნოემბერი","დეკემბერი"
  ];
  return `${date.getDate()} ${months[date.getMonth()]}, ${days[date.getDay()]}`;
}
function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}
function formatTime(str) {
  return str?.split("T")[1] || "-";
}

// Background image based on weather
function getWeatherBgImage(code) {
  if ([0, 1].includes(code)) return "/images/sunny.jpg";
  if ([2, 3, 45, 48].includes(code)) return "/images/cloudy.jpg";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "/images/rain.jpg";
  if ([71, 73, 75].includes(code)) return "/images/snow.jpg";
  if ([95, 96, 99].includes(code)) return "/images/storm.jpg";
  return "/images/default.jpg";
}

export default function Home() {
  const [city, setCity] = useState(
    localStorage.getItem("defaultCity") || "Tbilisi"
  );
  const [weather, setWeather] = useState(null);
  const [details, setDetails] = useState({});
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError("");
      setWeather(null);
      setDetails({});
      setForecast([]);
      try {
        const coords = cityCoordinates[city];
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}` +
          `&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset&hourly=relative_humidity_2m&timezone=auto`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Weather API error");
        const data = await res.json();
        setWeather(data.current_weather);

        let humidity = "-";
        if (data.hourly && data.hourly.time && data.hourly.relative_humidity_2m) {
          const now = new Date();
          const idx = data.hourly.time.findIndex(t => t.slice(0,13) === now.toISOString().slice(0,13));
          humidity = idx !== -1 ? data.hourly.relative_humidity_2m[idx] : "-";
        }

        setDetails({
          humidity,
          sunrise: data.daily.sunrise[0],
          sunset: data.daily.sunset[0],
        });

        const forecastData = [];
        for (let i = 0; i < 5; i++) {
          forecastData.push({
            date: data.daily.time[i],
            min: data.daily.temperature_2m_min[i],
            max: data.daily.temperature_2m_max[i],
            code: data.daily.weathercode[i],
          });
        }
        setForecast(forecastData);
      } catch (err) {
        setError("ამინდის მონაცემების მიღება ვერ მოხერხდა.");
      }
      setLoading(false);
    }
    fetchWeather();
  }, [city]);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "defaultCity") {
        setCity(e.newValue || "Tbilisi");
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const bgImage = weather ? getWeatherBgImage(weather.weathercode) : "/images/default.jpg";
    document.body.style.background = `
      linear-gradient(135deg, rgba(90,153,230,0.7), rgba(43,65,98,0.7)),
      url(${bgImage}) center/cover no-repeat
    `;
    document.body.style.minHeight = "100vh";
    document.body.style.width = "100vw";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.transition = "background 0.6s";
    return () => {
      document.body.style.background = "";
      document.body.style.transition = "";
    };
  }, [weather]);

  return (
    <div className="weather-home-bg">
      <main className="weather-ge-main-row">
        <div className="weather-ge-city-col">
          <div className="weather-ge-city-select-bar">
            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              className="city-dropdown"
              aria-label="აირჩიე ქალაქი"
            >
              {Object.keys(cityCoordinates).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="weather-ge-card">
            <div className="weather-ge-current">
              <h1 className="weather-ge-city">{city}</h1>
              <div className="weather-ge-date">{formatDate(new Date())}, {getTime()}</div>
              <div className="weather-ge-maininfo">
                <span className="weather-ge-icon" style={{fontSize: 70}}>
                  {weather ? getWeatherIcon(weather.weathercode) : "⏳"}
                </span>
                <span className="weather-ge-temp">
                  {weather && !loading ? `${Math.round(weather.temperature)}°` : ""}
                </span>
              </div>
              <div className="weather-ge-details">
                <div>ქარი: {weather ? weather.windspeed + " კმ/ს" : "-"}</div>
                <div>ტენიანობა: {details.humidity !== undefined ? details.humidity + "%" : "-"}</div>
                <div>ამინდი: {weather ? getWeatherDescription(weather.weathercode) : "-"}</div>
                <div>მზის ამოსვლა: {details.sunrise ? formatTime(details.sunrise) : "-"}</div>
                <div>მზის ჩასვლა: {details.sunset ? formatTime(details.sunset) : "-"}</div>
              </div>
              {error && <div className="weather-ge-error">{error}</div>}
            </div>
            <div className="weather-ge-forecast-block">
              <div className="weather-ge-forecast-title">ამინდის პროგნოზი</div>
              <div className="weather-ge-forecast-cards-row">
                {forecast.map((f, idx) => (
                  <div className="weather-ge-forecast-card" key={idx}>
                    <div className="weather-ge-forecast-date">{formatDate(f.date)}</div>
                    <div className="weather-ge-forecast-icon" style={{fontSize: 32}}>{getWeatherIcon(f.code)}</div>
                    <div className="weather-ge-forecast-desc">{getWeatherDescription(f.code)}</div>
                    <div className="weather-ge-forecast-temp">{Math.round(f.min)}° / {Math.round(f.max)}°</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}