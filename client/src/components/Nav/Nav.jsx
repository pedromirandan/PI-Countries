import React from 'react'
import "./Nav.css"
import { Link } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"

export default function Nav(props) {
  const { homeState } = props;
  return (
    <div className='Nav'>.
      <Link to="/activity/create"><button className='boton' id='form'>CREATE ACTIVITY</button></Link>
      <SearchBar className="SearchBar" homeState={homeState} />
      <Link to="/"><button className='boton' id='logout'>LOG OUT</button></Link>
    </div>
  )
}