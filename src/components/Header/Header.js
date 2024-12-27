import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  function updateTime() {
    const now = new Date();
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const formattedDate = now.toLocaleDateString(undefined, options);
    const formattedTime = now.toLocaleTimeString();
    setCurrentTime(`${formattedDate}, ${formattedTime}`);
  }

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000); // Update time every second
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  function toggleTheme() {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme", !darkMode);
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Weather Tracker</h1>
        </div>
        <div className="date-time">
          <p>{currentTime}</p>
        </div>
        <div className="nav-buttons">
          <button className="toggle-theme" onClick={toggleTheme}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}
