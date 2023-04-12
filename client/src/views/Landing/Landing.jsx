import React from 'react'
import "./Landing.css"
import { Link } from "react-router-dom"

export default function Landing() {
  return (
    <div className='Landing'>
      <div className="container">
        <h1 id='welcome'>WELCOME TO COUNTRIES</h1>
        <Link to="/home"><button id='boton'>LOG IN</button></Link>
        <div className="logos">
          <div className="logos">
            <a href="https://github.com/pedromirandan" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" alt="github" className="github" />
            </a>
            <a href="https://www.linkedin.com/in/pedro-miranda-nowak-857157259/" target="_blank" rel="noopener noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linkedIn" className="linkedIn" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
