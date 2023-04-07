import React from 'react'
import "./Landing.css"
import { Link } from "react-router-dom"

export default function Landing() {
  return (
    <div className='Landing'>
      <h1 id='welcome'>WELCOME TO COUNTRIES</h1>
      <Link to="/home"><button id='boton'>LOG IN</button></Link>
    </div>
  )
}
