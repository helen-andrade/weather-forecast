import React from 'react'
import './styles.css'

const Container = ({ weather, forecast }) => {
  return (
    <div className="container">
      <p className='country'>{weather.location.name}, {weather.location.region} - {weather.location.country}</p>
      <p className='data-hour'>{weather.location.localtime}</p>

      <div className='temperature-info'>
        <img src={weather.current.condition.icon} alt="Weather condition" />
        <p className='temperature'>{weather.current.temp_c}ºC</p>

        <div className='temperature-min-max'>
          <p>{forecast.forecast.forecastday[0].day.mintemp_c}º</p> /
          <p>{forecast.forecast.forecastday[0].day.maxtemp_c}º</p>
        </div>
      </div>

      <div className='other-info'>
          <p>{weather.current.condition.text}</p>
          <span>--------------------------------------</span>
          <p>Umidade: {weather.current.humidity}%</p>
          <span>--------------------------------------</span>
          <p>Vento: {weather.current.wind_kph}km/h</p>
          <span>--------------------------------------</span>
          <p>Probabilidade de chuva: {forecast.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
      </div>
    </div>
  )
}

export default Container