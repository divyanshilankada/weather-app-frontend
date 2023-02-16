import './App.css';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './components/home';
import Details from './components/details';

const  API_currentt= 'https://api.openweathermap.org/data/2.5/weather?';
const  API_forecast= 'https://api.openweathermap.org/data/2.5/forecast?';
const  API_key = '0cd39b125847e39465cc79d1a23674db';

export const LocationDataContext = createContext();
export const WeatherContext = createContext();



function App() {

  const [latitude, setLatitude] = useState('17.3617');
  const [longitude, setLongitude] = useState('78.4747');
  const [locationData, setLocationData] = useState([]);
  const [flag, setFlag] = useState(true);
  const [locationCoordinates, setLocationCoordinates] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecastToday, setForecastToday] = useState([]);
 

  useEffect( () => {

    (async function(){
      navigator.geolocation.getCurrentPosition((position) => {
         setLatitude(position.coords.latitude);
         setLongitude(position.coords.longitude);
      });
  
      await axios.get("http://localhost:8080/")
      .then((data) => setLocationData([...data.data.data]))
      .catch((err) => console.log(err));
    })()
    
  },[]);
  

  useEffect( () => {

    (async function(){

      let currentLocationEndPoint = `${API_currentt}lat=${latitude}&lon=${longitude}&units=metric&appid=${API_key}`;

      await axios.get(currentLocationEndPoint).then((response) =>  setWeatherData({...response.data})).catch((err) => console.log(err));

    })()
    

  },[latitude,longitude]);

  useEffect( () => {

    if(locationCoordinates.length !== 0)
    {
      (async function(){

        let currentLocationEndPoint = `${API_currentt}lat=${locationCoordinates[0]}&lon=${locationCoordinates[1]}&units=metric&appid=${API_key}`;
        let searchLocationEndPoint = `${API_forecast}lat=${locationCoordinates[0]}&lon=${locationCoordinates[1]}&units=metric&appid=${API_key}`;

        await axios.get(searchLocationEndPoint).then((response) =>  { 

            let da = response.data.list;
            let arr = [];

      
            for(let i=0; i<da.length; i++)
            {
                if(i<9)
                {
                    arr.push(da[i]);
                }
            }

            arr.sort(({dt_txt:a}, {dt_txt:b}) => {
              
              a=a.split(" ");
              b=b.split(" ");

              return a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0;

            });
    
            setForecastToday([...arr]);
          
            
          console.log(response.data)}).catch((err) => console.log(err));

        await axios.get(currentLocationEndPoint).then((response) => setCurrentWeather({...response.data})).catch((err) => console.log(err));

      })()

    }
       

  },[locationCoordinates]);


  return (
    <div className="App">
      <BrowserRouter>
        <LocationDataContext.Provider value={{"locationData":locationData, "flag" : setFlag, "locationCoordinates":setLocationCoordinates}}>
                <WeatherContext.Provider value={{weatherData:weatherData, currentWeather:currentWeather, forecastToday:forecastToday, locationCoordinates:locationCoordinates}}>
                    <Routes>
                        <Route path='/' element={flag ? <Home></Home> : <Details></Details> }></Route>
                        <Route path='*' element={<Home></Home>}></Route>
                    </Routes>
                </WeatherContext.Provider>
          </LocationDataContext.Provider>
      </BrowserRouter>
        
    </div>
  );
}

export default App;
