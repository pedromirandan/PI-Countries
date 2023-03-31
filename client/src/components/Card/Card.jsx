import React from 'react'
import "./Card.css"

export default function Card(props) {
  const { name, flagImage, continent, capital, subregion, area, population } = props.country;
  return (
    <>
      <div className='Card'>
        <h1>Nombre: {name}</h1>
        <img src={flagImage} alt="country_image"></img>
        <p>{continent}</p>
        <p>{capital}</p>
        <p>{subregion}</p>
        <p>{area}</p>
        <p>{population}</p>
      </div>
    </>
  )
}
