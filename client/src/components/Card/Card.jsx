import React from 'react'
import "./Card.css"
import { Link } from "react-router-dom";

export default function Card(props) {
  const { name, flagImage, continent } = props.country;

  return (
    <>
    <Link to={`/country/${props.detailID}`} className='Card'>
      <div>
        <h1>{name}</h1>
        <img src={flagImage} alt="country_image"></img>
        <p>Continent: {continent}</p>
      </div>
    </Link>
    </>
  )
}
