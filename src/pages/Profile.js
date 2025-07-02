import React, { useState } from "react";
import "./Profile.scss"; 

const cityList = [
  "Tbilisi", "Batumi", "Kutaisi", "Rustavi", "Zugdidi",
  "Gori", "Poti", "Telavi", "Akhaltsikhe", "Samtredia"
];

function Profile() {
  const [defaultCity, setDefaultCity] = useState(
    localStorage.getItem("defaultCity") || "Tbilisi"
  );
  const [name, setName] = useState(
    localStorage.getItem("profileName") || ""
  );

  const handleCityChange = (e) => {
    setDefaultCity(e.target.value);
    localStorage.setItem("defaultCity", e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    localStorage.setItem("profileName", e.target.value);
  };

  // Avatar initial (optional)
  const getInitial = () => (name ? name[0].toUpperCase() : defaultCity[0].toUpperCase());

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">{getInitial()}</div>
        <h2>
          {name
            ? <>Welcome <span style={{color: "#274472"}}>{name}</span>, choose preferred city</>
            : "Welcome, choose preferred city"}
        </h2>
        <div className="profile-section">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              maxLength={32}
            />
          </label>
          <label>
            Default City:
            <select value={defaultCity} onChange={handleCityChange}>
              {cityList.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="profile-note">
          Your name and selected default city will appear first on the Home page.
        </div>
      </div>
    </div>
  );
}

export default Profile;