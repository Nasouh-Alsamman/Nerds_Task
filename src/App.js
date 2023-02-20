import React, { useState, useEffect } from "react";
import Tasks from "./components/Tasks/Tasks";
import Profile from "./components/Profile/Profile";
import Weather from "./components/Weather/Weather";

function App() {
  const [istask, setIstask] = useState(false);
  const [isweather, setIsweather] = useState(true);
  const [isprofile, setIsprofile] = useState(false);
  const [islog, setIslog] = useState(false);

  const taskpage = () => {
    setIstask(true);
    setIsweather(false);
    setIsprofile(false);
  };
  const weatherpage = () => {
    setIstask(false);
    setIsweather(true);
    setIsprofile(false);
  };
  const profilepage = () => {
    setIstask(false);
    setIsweather(false);
    setIsprofile(true);
  };
  return (
    <>
      <header className="header">
        <h2>Nerds </h2>

        <div className="headerbuttons">
          <button onClick={taskpage}>Tasks</button>
          <button onClick={weatherpage}>Weather</button>
          <button onClick={profilepage}> Profile</button>
        </div>
      </header>

      {isprofile && <Profile />}
      {istask && <Tasks />}
      {isweather && <Weather />}
    </>
  );
}

export default App;
