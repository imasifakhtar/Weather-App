import { useState } from "react";
import "./App.css";

const api = {
  key: "4e818060632504be2708200c1bfeafaf",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(
        (res) =>
          res.json().then((result) => {
            setWeather(result);
            setQuery("");
            console.log(result);
          })
      );
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];

    return `${date} ${day}, ${month}`;
  };

  return (
    <div className="App">
      <h2 className="title">Weather App</h2>
      <div className="main">
        <div className="container">
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search City"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {typeof weather.main != "undefined" ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>

              <div className="weather-box">
                <div className="temp">
                  <p className="main-temp">{Math.round(weather.main.temp)}°C</p>
                  <div className="extra">
                    <p className="feels-like">L: {weather.main.temp_min}°</p>
                    <p className="hi-lo">H: {weather.main.temp_max}°</p>
                  </div>
                </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
