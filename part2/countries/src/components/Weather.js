import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({country}) => {
    const [weatherInfo, setWeatherInfo] = useState({})

    const capital = country.capital[0]
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]

    useEffect( () => {
        async function fetchWeather() {
            console.log('Fetching weather')
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
            setWeatherInfo(response.data)
        }
        fetchWeather()
    }, [])
    console.log(weatherInfo);
    
    if (Object.entries(weatherInfo).length === 0) {
        console.log('Wait for fetching weather')
        return(
            <span> Wait for fetching weather </span>
        )
    }

    return(
        <div>
            <h2> Weather in {capital} </h2>
            <span> temerature {weatherInfo.main.temp ?? 'wait'} Celcius </span> <br/>
            <img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt={`${capital}_weather_icon`}/> <br/>
            <span> wind {weatherInfo.wind.speed} m/s </span>
        </div>
    )
} 

export default Weather;