import React from 'react'
import "./Nav.css"
import { Link } from "react-router-dom"

export default function Nav() {
  return (
    <div className='Nav'>
      <Link to="/"><button className='boton' id='logout'>LOG OUT</button></Link>
    </div>
  )
}