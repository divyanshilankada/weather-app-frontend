import { useContext, useEffect, useState} from 'react';
import Search from './search';
import { WeatherContext } from '../App';
import './styles/details.css';




function Details() {

  const [flag,setFlag] = useState(true);

  const weather = useContext(WeatherContext);
  const currentWeather = weather.currentWeather;
  const forecastToday = weather.forecastToday;
  const locationCoordinates = weather.locationCoordinates;

  var date = new Date(currentWeather.dt * 1000)
  date = date.toDateString().split(" ");

  
  function dateFunc(e)
  {
    let temp = e.split(" ");
    let time = temp[1].split(":"); 
    return `${time[0]}:${time[1]}`
  }

  function favorites()
  {
      let obj = `${locationCoordinates[0]},${locationCoordinates[1]},${currentWeather.name},${currentWeather.sys.country}`;

      localStorage.setItem(`${locationCoordinates[0]},${locationCoordinates[1]}`,obj);
      if(localStorage.getItem(`${locationCoordinates[0]},${locationCoordinates[1]}`))
      {
          setFlag(false);
      }

    }

  useEffect(() =>{

    if(localStorage.getItem(`${locationCoordinates[0]},${locationCoordinates[1]}`,locationCoordinates))
      {
          setFlag(false);
      }
      else
      {
        setFlag(true);
      }
  },[locationCoordinates]);


  return (
    <div className="details-container">
        <Search></Search>
        {Object.keys(currentWeather).length === 0 ? null : 
              <div className='home-box'>
                <div className='weather-main-details-box'>  
                    <div className='current-weather-details-box'>
                        <div className='current-weather-details'>
                            <div className='current-loc-details'>
                                <p>{`${currentWeather.name}, ${currentWeather.sys.country}`}</p>
                                <p>{`${date[1]} ${date[2]}, ${date[3]}`}</p>
                            </div>
                            <h1>{`${currentWeather.main.temp}°c`}</h1>
                            <h3>{`${currentWeather.weather[0].main}`}</h3>
                        </div>
                        
                        <div className='current-weather-details'>
                            <p>{`Feels like : ${currentWeather.main.feels_like}°c`}</p>
                            <p>{`Humidity : ${currentWeather.main.humidity}°c`}</p>
                            <p>{`Wind Speed : ${currentWeather.wind.speed}m/sec`}</p>
                            <p>{`Visibility : ${currentWeather.visibility/1000}km`}</p>

                        </div> 
                    </div>
                    <button onClick={flag ?favorites: null}>{ (!flag)?<>Added to Favourite</> : <>Add to favorites</>}</button>

                  </div>
              </div>
          }

          <div className='today-weather-forcast-box'>
              <p>Today</p>
              <div className='today-weather'>
                {forecastToday.length === 0 ? null : 

                    forecastToday.map((item,i) =>  

                    <div className='today-three-hour-box' key={i}>
                        <div>
                            <p>{dateFunc(item.dt_txt)}</p>
                        </div>
                        <h1>{`${item.main.temp}°c`}</h1>
                    </div>

                )}
              </div>
              
          </div>
    </div>
  );
}

export default Details;
