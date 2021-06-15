import React, { useState } from 'react';
import DateAndTime from './components/DateAndTime';
import { fetchAPI } from './apis/fetchAPI';
import './css/style.css';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const errorInfo = document.querySelector('.error-info');

  const search = async(e) => {
    if(e.key === 'Enter') {
      const data = await fetchAPI(query);
      setWeather(data); 
      setQuery('');

      if(query === '') {
        errorInfo.textContent = 'Please, write city name';
      }
      else if (!data.main) {
        errorInfo.textContent ='There is no such location';
      }
    }
  }

  if(weather.weather) {
    const background = document.querySelector('.background');
    switch(weather.weather[0].main) {
      case 'Clear': {
        background.classList.remove('rain');
        background.classList.remove('snow');
        background.classList.remove('haze');
        background.classList.add('clear');
        break;
      }
      case 'Rain': {
        background.classList.remove('clear');
        background.classList.remove('snow');
        background.classList.remove('haze');
        background.classList.add('rain');
        break;
      }
      case 'Snow': {
        background.classList.remove('clear');
        background.classList.remove('rain');
        background.classList.remove('haze');
        background.classList.add('snow');
        break;
      }
      case 'Haze': {
        background.classList.remove('clear');
        background.classList.remove('rain');
        background.classList.remove('snow');
        background.classList.add('haze');
        break;
      }
      default: {
        background.classList.remove('rain');
        background.classList.remove('snow');
        background.classList.remove('clear');
        background.classList.remove('haze');
      }
    }
  }

  return (
    <div className="wrapper">
      <div className="background"><div className="bg"></div></div>
      <div className="container">
        <DateAndTime/>
        {<input type="text" className="search-input" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search}/>}

        {weather.main ? (
          <div className="location-card">
            <div className="city">
              <h2 className="city-name"><span>{weather.name}</span><sup>{weather.sys.country}</sup></h2>
              <div className="grid-container">
                <span className="data-title">Latitude:</span><span className="data-value">{(weather.coord.lat.toFixed(2)).replace('.', '°')}'</span> 
                <span className="data-title">Longitude:</span><span className="data-value">{(weather.coord.lon.toFixed(2)).replace('.', '°')}'</span>
                <span className="data-title">Sunrise:</span><span className="data-value">{(new Date( `${weather.sys.sunrise}` * 1000)).toLocaleString().slice(12, -3)}</span>
                <span className="data-title">Sunset:</span><span className="data-value">{(new Date( `${weather.sys.sunset}` * 1000)).toLocaleString().slice(12, -3)}</span>
                <span className="data-title">Humidity:</span><span className="data-value">{weather.main.humidity}</span>
                <span className="data-title">Pressure:</span><span className="data-value">{weather.main.pressure} hPa</span>
              </div>
              <div className="temp-icon_container">
                <div className="img">
                  {/* "http://openweathermap.org/img/w/" + iconcode + ".png"; */}
                  <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} className="img__icon"/>
                </div>
                <span className="temp">{weather.main.temp.toFixed(1)} &deg;C</span>
              </div>
              <span className="description">{weather.weather[0].description}</span>
            </div>
          </div>
        ) : <p className="error-info">{query === '' && 'Please, write city'} {(query !== '' && !query.main) ? 'There is no such location' : null}</p>}
        </div>
      </div>
  )
}

export default App;