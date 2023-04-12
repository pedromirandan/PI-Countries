import React, { useState, useRef } from 'react';
import { getCountries, setCountries, sortCountries } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import "./Filters.css"

export default function Filters(props) {

  const {homeState} = props;
  const {state, setState} = homeState;

  const reduxState = useSelector((state) => state);

  const { countries, preFilterCountries } = reduxState

  const dispatch = useDispatch()

  const [localState, setLocalState] = useState({
    firstFilter: {
      type: "",
      order: ""
    },
    secondFilter: {
      continent: "",
      activity: ""
    },
  });

  function changeHandler(event) {
    switch (event.target.name) {

      case "type":
        setLocalState({
          ...localState,
          firstFilter: {
            ...localState.firstFilter,
            type: event.target.value
          }
        })
        break;

      case "order":
        setLocalState({
          ...localState,
          firstFilter: {
            ...localState.firstFilter,
            order: event.target.value
          }
        })
        break;

      case "continent":
        setLocalState({
          ...localState,
          secondFilter: {
            ...localState.secondFilter,
            continent: event.target.value
          }
        })
        break;

      case "activity":
        setLocalState({
          ...localState,
          secondFilter: {
            ...localState.secondFilter,
            activity: event.target.value
          }
        })
        break;

      default:
        setLocalState({ ...localState })
    }
  }

  function clickHandler(filter) {

    setState({
      ...state,
      pageIndex: 0
    })

    if (filter === "first") {
      if (!localState.firstFilter.type || !localState.firstFilter.order) alert("¡Por favor rellena los campos de los filtros antes de buscar!")
      else dispatch(sortCountries(localState, countries.slice(), reduxState, filter))
    }
    else {
      if (!localState.secondFilter.continent && !localState.secondFilter.activity) alert("¡Por favor rellena los campos de los filtros antes de buscar!")
      else dispatch(sortCountries(localState, preFilterCountries.slice(), reduxState, filter))
    }
  }

  function resetHandler(filter) {
    if (filter === "first") {
      dispatch(getCountries())
      orderSelectRef.current.value = "";
      typeSelectRef.current.value = "";
      setLocalState({
        ...localState,
        firstFilter: {
          type: "",
          order: ""
        }
      })
    }
    else {
      dispatch(setCountries(preFilterCountries))
      continentSelectRef.current.value = "";
      activitySelectRef.current.value = "";
      setLocalState({
        ...localState,
        secondFilter: {
          continent: "",
          activity: ""
        }
      })
    }
  }

  const orderSelectRef = useRef(null);
  const typeSelectRef = useRef(null);
  const continentSelectRef = useRef(null);
  const activitySelectRef = useRef(null);

  const stack = []; //Para ir almacenando los IDs.

  return (
    <div id='filters'>

      <div id='second'>
        <label>Continent</label>
        <select name="continent" onChange={changeHandler} ref={continentSelectRef}>
          <option value="">---</option>
          <option value="South America">South America</option>
          <option value="North America">North America</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
          <option value="Antarctica">Antarctica</option>
        </select>

        <label>Activity</label>
        <select name="activity" onChange={changeHandler} ref={activitySelectRef}>
          <option value="">---</option>
          {reduxState.allActivities.map((activity) => {
            if (!stack.includes(activity.name)) {
              stack.push(activity.name)
              return <option key={activity.ID} value={activity.name}>{activity.name}</option>
            }
            return null;
          })}
        </select>

        <button onClick={() => clickHandler("second")}>FILTER</button>
        <button onClick={() => resetHandler("second")} className='clear'>CLEAR</button>
      </div>

      <div id='first'>
        <label>Order</label>
        <select name="order" onChange={changeHandler} ref={orderSelectRef}>
          <option value="">---</option>
          <option value="alfabetico">Alfabético</option>
          <option value="poblacion">Población</option>
        </select>

        <label>Type</label>
        <select name="type" onChange={changeHandler} ref={typeSelectRef}>
          <option value="">---</option>
          <option value="ascendente">Ascendente</option>
          <option value="descendente">Descendente</option>
        </select>
        <button onClick={() => clickHandler("first")}>FILTER</button>
        <button onClick={() => resetHandler("first")} className='clear'>CLEAR</button>
      </div>
    </div>
  )
}
