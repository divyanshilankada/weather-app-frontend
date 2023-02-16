import { useContext, useState} from 'react';
import Search from './search';
import './styles/home.css';
import { WeatherContext } from '../App';
import { LocationDataContext } from '../App';


function Home() {

  const [temp, setTemp] = useState(localStorage);

  const weather = useContext(WeatherContext);
  const location = useContext(LocationDataContext);

  const setFlag = location.flag;
  const setLocationCoordinates = location.locationCoordinates;
  const locationCoordinates = weather.locationCoordinates;


  const weatherData = weather.weatherData;
  var date = new Date(weatherData.dt * 1000)
  date = date.toDateString().split(" ");

console.log(localStorage);

  function handleFavs(e)
  {
      let arr = e.target.id.split(",");
      setLocationCoordinates([...arr]);
      setFlag(true);
  }

  function handleRemoveFav(e)
  {
      console.log(e.target.id);
      localStorage.removeItem(e.target.id);
      setTemp({...localStorage});
  }

  return (
    <div className="home-container">

        <Search></Search>
          {Object.keys(weatherData).length===0 ? null : 
            <div className='home-box'>
                <div className='home-current-details'>
                    <p className='current-loc-header'>Current Location</p>
                    <div className='current-weather-details-box'>

                        <div className='current-weather-details'>
                            <div className='current-loc-details'>
                                <p>{`${weatherData.name}, ${weatherData.sys.country}`}</p>
                                <p>{`${date[1]} ${date[2]}, ${date[3]}`}</p>
                            </div>
                            <h1>{`${weatherData.main.temp}°c`}</h1>
                            <h3>{`${weatherData.weather[0].main}`}</h3>
                        </div>
                        
                        <div className='current-weather-details'>
                            <p>{`Feels like : ${weatherData.main.feels_like}°c`}</p>
                            <p>{`Humidity : ${weatherData.main.humidity}°c`}</p>
                            <p>{`Wind Speed : ${weatherData.wind.speed}m/sec`}</p>
                            <p>{`Visibility : ${weatherData.visibility/1000}km`}</p>

                        </div>
                    </div>
                  </div>
              </div>
          }   

          <div className='user-favourites-locations-box'>
            <p>Favourite</p>
            <div className='favs-box-loc'>
              {localStorage.length === 0  ? null : Object.keys(temp).map((value,i) => 
                {var val = localStorage.getItem(value).split(","); console.log(val[2]);

                  return (<div key={i}>
                    <div className='favs-box'>
                        <h3 id={value} onClick={handleFavs}>{`${val[2]}, ${val[3]}`}</h3>
                        <button id={value} onClick={handleRemoveFav}>Revome</button>
                    </div>
                  </div>
              
                )})}
            </div>
            
        </div>     
    </div>
  );
}

export default Home;
