import { useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { useState } from 'react'
import Container from './components/Container'

function App() {
  
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  const [weather, setWeather] = useState()
  const [forecast, setForecast] = useState()
  const [location, setLocation] = useState()

  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ latitude, longitude })
        },
        (error) => {
          console.error(error.message);
        }
      )
    } else {
      alert("Geolocalização não é suportada pelo seu navegador");
    }
  }

  const fetchForecast = async () => { 
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location.latitude},${location.longitude}&days=1&aqi=no&alerts=no`
    const response = await axios.get(url)
    setForecast(response.data)
  }

  const fetchRealtime = async () => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location.latitude},${location.longitude}`
    const response = await axios.get(url)
    setWeather(response.data)
  }

  useEffect(() => {
    getGeolocation()
  }, [])

  useEffect(() => {
    if (location) {
      fetchRealtime()
      fetchForecast()
    }
  }, [location])

  if (!weather && !forecast) return null;

  return (
    <div className='all-container'>
      <Container weather={weather} forecast={forecast} />
    </div>
  )
}

export default App