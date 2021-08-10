import React, { useEffect, useState } from 'react';
import rainIcon from '../../../assets/Rain_icon.png'
import cloudIcon from '../../../assets/Clouds_icon.png'
import clearIcon from '../../../assets/Sun_icon.png'
import './Weather.css'

export default function Weather() {
  const API_KEY = 'd0a10211ea3d36b0a6423a104782130e'
  const [lat, setLat] = useState([]);
  const [lon, setLon] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(Math.round(position.coords.latitude));
        setLon(Math.round(position.coords.longitude));
      });
      if(Number.isInteger(lat) && Number.isInteger(lon)){
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setData(result)
        });
      }

    }
    fetchData();
  }, [lat, lon])

  return (
    <div>
      <div className="weather-top">
        <div className="weather-icon-div">
          {data.weather && data.weather[0].main === "Rain" && <img className="weather-icon" src={rainIcon} alt={"Rain"} />}
          {data.weather && data.weather[0].main === "Clear" && <img className="weather-icon" src={clearIcon} />}
          {data.weather && data.weather[0].main === "Clouds" && <img className="weather-icon" src={cloudIcon} alt={"Clouds"} />}
        </div>
        <div>
          <div className="weather-temperature">
            {data.weather && JSON.stringify((Math.round(data.main.temp) - 273), null, 2)}
            <div>degrees</div>
          </div>
        </div>
      </div>
      {data && <div className="weather-town">{data.name}</div>}
    </div>
  )
}