import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchCountries, getCountries } from '../../redux/actions';
import "./SearchBar.css"

export default function SearchBar(props) {

  const { homeState } = props;

  const dispatch = useDispatch();

  const [state, setState] = useState({
    input: "",
  })

  function changeHandler(e) {
    setState({ input: e.target.value })
    if (!e.target.value) {
      dispatch(getCountries())
      homeState.setState({
        ...homeState.state,
        pageIndex: 0
      })
    }
  }

  function clickHandler(e) {
    homeState.setState({
      ...homeState.state,
      pageIndex: 0
    })
    e.preventDefault();
    dispatch(searchCountries(state.input))
  }

  return (
    <div>
      <form>
        <input className='input' placeholder='Country name' type='search' onChange={changeHandler}></input>
        <button className='search-btn' onClick={clickHandler}>SEARCH</button>
      </form>
    </div>
  )
}
