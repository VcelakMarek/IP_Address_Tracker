import { useState, useEffect, useContext } from "react";
import Map from "./Map";
import coordinatesContext from "./coordinates.context";
import fetchIPify from "./fetchIPify";
import "./scss/IpAddressTracker-styles.scss";

const IpAddressTracker = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [geolocation, setGeolocation] = useState("");
  const [, setCoordinates] = useContext(coordinatesContext);
  //   const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  //   console.log(API_KEY);
  useEffect(() => {
    fetchIPify("151.101.2.133", setGeolocation, setCoordinates);
  }, []);
  return (
    <>
      <header>
        <h1>IP Address Tracker</h1>
        <div className="search-line">
          <label htmlFor="IpAddress">
            <input
              type="text"
              id="IpAddress"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter")
                  fetchIPify(ipAddress, setGeolocation, setCoordinates);
              }}
              placeholder="Search for any IP address or domain"
            />
          </label>
          <button
            onClick={(e) => {
              fetchIPify(ipAddress, setGeolocation, setCoordinates),
                e.preventDefault();
            }}
          >
            <img src="./assets/icon-arrow.svg" alt="icon-arrow" />
          </button>
        </div>
        <section className="Ip-info">
          <ul>
            <li>
              <div></div>
              <h3>IP ADDRESS</h3>
              <h2> {geolocation != "" ? geolocation.ip : "not loaded yet"}</h2>
            </li>
            <li>
              <div></div>
              <h3>LOCATION</h3>
              <h2>
                {geolocation != ""
                  ? `${geolocation.location.city}, ${geolocation.location.region}
                ${geolocation.location.postalCode}`
                  : "not loaded yet"}
              </h2>
            </li>
            <li>
              <div></div>
              <h3>TIMEZONE</h3>
              <h2>
                {geolocation != ""
                  ? geolocation.location.timezone
                  : "not loaded yet"}
              </h2>
            </li>
            <li>
              <h3>ISP</h3>
              <h2>{geolocation != "" ? geolocation.isp : "not loaded yet"}</h2>
            </li>
          </ul>
        </section>
      </header>
      <div id="map">
        <Map />
      </div>
    </>
  );
};

export default IpAddressTracker;
