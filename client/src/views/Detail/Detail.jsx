import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import "./Detail.css"
import { Link } from 'react-router-dom';

export default function Detail() {

  const [state, setState] = useState({ detail: { activities: [] } })

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/countries/${id}`)
      .then((response) => {
        const { data } = response;
        data.population = data.population.toLocaleString()
        setState({ detail: data })
      })
  }, [id])

  const { ID, name, flagImage, capital, continent, population, subregion, activities } = state.detail;
  return (
    <div className='Country'>
      <Link to="/home"><button id="exit">{"← BACK"}</button></Link>
      <h1>{ID}</h1>
      <h1>{name}</h1>
      <img src={flagImage} alt="country_image"></img>
      <p>Capital: {capital}</p>
      <p>Continent: {continent}</p>
      <p>Population: {population}</p>
      <p>Subregion: {subregion}</p>
      {activities.length ? <h1>Activities:</h1> : null}
      {activities.length ? activities.map((activity) => {
        const { ID, name, difficulty, duration, season } = activity;
        return <div key={ID}>
          <hr></hr>
          <p>Name: {name}</p>
          <p>Difficulty: {difficulty}</p>
          <p>Duration: {duration}</p>
          <p>Season: {season}</p>
        </div>
      }) : null}
    </div >
  )
}
