import React, { useEffect, useRef, useState } from 'react'
import'./Weather.css'
import search_icon from'../Assets/search.png'
import clear_icon from'../Assets/clear.png'
import cloud_icon from'../Assets/cloud.png'
import drizzle_icon from'../Assets/drizzle.png'
import wind_icon from'../Assets/wind.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import humidity_icon from'../Assets/humidity.png'
const Weather = () => {
  
  const [weatherData,setWeatherData]=useState(false);
  const allIcons={
    "01d":clear_icon,
    "01n":clear_icon,
    "02d":cloud_icon,
    "02n":cloud_icon,
    "03d":cloud_icon,
    "03n":cloud_icon,
    "04d":drizzle_icon,
    "04n":drizzle_icon,
    "09d":rain_icon,
    "09n":rain_icon,
    "010d":rain_icon,
    "010n":rain_icon,
    "13d":snow_icon,
    "13n":snow_icon
  }
  const inputRef=useRef()

 const APP_ID='cf23315d130da6575f31c3a1a1d12efa'

  const search=async(city)=>{
    if(city===""){
      alert("Enter city name");
      return;
    }
    try{
      
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}&units=metric`
      
     
      const response=await fetch(url)
      const data=await response.json()

      if (!response.ok){
        alert(data.message);
        return;
      }
      console.log(data)
      
      const icon=allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData(
        {
          humidity:data.main.humidity,
          windSpeed:data.wind.speed,
          temperature:Math.floor(data.main.temp),
          location:data.name,
          icon:icon
        }
      )
    }catch(error){
  setWeatherData(false);
  console.log("Error in fetching weather Data")
    }
  }
  
    useEffect(()=>{
      search("Ludhiana");
    },[])     


  return (
    <>
    <div className='weather'>
        <div className='search-bar'>
         <input  ref={inputRef} type='text' placeholder='Search'/>
         <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
        </div>

        {weatherData?
        <>
<img  className='weather-icon' src={weatherData.icon} alt=""/>
        <p className='temp'>{weatherData.temperature}°c</p> 
        <p className='location'>{weatherData.location}</p>  
        <div className='weather-data'>
            <div className='col'>
              <img src={humidity_icon} alt=""/>
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt=""/>
              <div>
                <p>{weatherData.windSpeed} km/h</p>  
                <span>Wind Speed</span>
              </div>
            </div>
        </div>
        </>
        :
        <>
        </>}
        
    </div>
    </>
  )
}

export default Weather