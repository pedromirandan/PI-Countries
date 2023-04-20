import React, { useState } from 'react'
import axios from "axios";
import "./Form.css"
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"

export default function Form() {

    const countries = useSelector((state) => state.allCountries);

    const sortedCountries = countries.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    const [error, setError] = useState({
        nameError: "Cannot be empty",
        difficultyError: "Cannot be empty",
        durationError: "Cannot be empty",
        seasonError: "Cannot be empty",
        selectedCountriesError: "Cannot be empty"
    })

    const [state, setState] = useState({
        name: "",
        difficulty: 0,
        duration: 0,
        season: "",
        selectedCountries: [],
    })

    function validate(type, input) {
        switch (type) {
            case "name":
                if (/\d/.test(input)) setError({ ...error, nameError: "Cannot contain numbers" })
                else {
                    if (!input) setError({ ...error, nameError: "Cannot be empty" })
                    else {
                        setError({ ...error, nameError: "" })
                    }
                }
                break;

            case "difficulty":
                if (!input) setError({ ...error, difficultyError: "Cannot be empty" })
                else setError({ ...error, difficultyError: "" })
                break;

            case "duration":
                if (!input) setError({ ...error, durationError: "Cannot be empty" })
                else {
                    if (input <= 0) setError({ ...error, durationError: "Has to be greater than 0" })
                    else {
                        setError({ ...error, durationError: "" })
                    }
                }
                break;

            case "season":
                if (!input) setError({ ...error, seasonError: "Cannot be empty" })
                else setError({ ...error, seasonError: "" })
                break;

            case "countries":
                if (!input) setError({ ...error, selectedCountriesError: "Cannot be empty" })
                else setError({ ...error, selectedCountriesError: "" })
                break;

            default:
                break;
        }
    }


    function changeHandler(event) {

        switch (event.target.name) {
            case "name":
                setState({
                    ...state,
                    name: event.target.value
                })
                validate(event.target.name, event.target.value)
                break;

            case "difficulty":
                setState({
                    ...state,
                    difficulty: event.target.value
                })
                validate(event.target.name, event.target.value)
                break;

            case "duration":
                setState({
                    ...state,
                    duration: event.target.value
                })
                validate(event.target.name, event.target.value)
                break;

            case "season":
                setState({
                    ...state,
                    season: event.target.value
                })
                validate(event.target.name, event.target.value)
                break;

            case "countries":
                if (state.selectedCountries.includes(event.target.value)) {
                    alert("The country has already been selected!")
                } else {
                    if (!event.target.value) setState({ ...state, selectedCountries: [] })
                    else setState({ ...state, selectedCountries: [...state.selectedCountries, event.target.value] })
                }
                validate(event.target.name, event.target.value)
                break;

            default:
                break;
        }
    }

    function clickHandler(event) {
        event.preventDefault()
        const { name, difficulty, duration, season, selectedCountries } = state;
        const { nameError, difficultyError, durationError, seasonError, selectedCountriesError } = error;
        const selectedCountriesIDs = []
        for (let i = 0; i < selectedCountries.length; i++) {
            for (let j = 0; j < countries.length; j++) {
                if (selectedCountries[i] === countries[j].name) selectedCountriesIDs.push(countries[j].ID)
            }
        }

        if (!nameError && !difficultyError && !durationError && !seasonError && !selectedCountriesError) {
            axios.post("http://localhost:3001/activities", {
                "name": name,
                "difficulty": difficulty,
                "duration": duration,
                "season": season,
                "idPais": selectedCountriesIDs
            }).then((response) => {
                alert("The activity has been created successfully!")
            }).catch((response) => {
                alert(response.message)
            })
        }
        else {
            alert("Complete or correct all fields to create an activity!")
        }
    }

    function removeFromList(event) {
        event.preventDefault()
        const newSelectedCountries = state.selectedCountries.filter((name) => name !== event.target.value);
        setState({ ...state, selectedCountries: newSelectedCountries });
        if (newSelectedCountries.length === 0) setError({ ...error, selectedCountriesError: "Cannot be empty" })
    }



    return (
        <div className='FormPage'>
            <Link to="/home"><button id="exit">{"← BACK"}</button></Link>
            <form className='form'>

                <div className='name'>
                    <label>Name: </label>
                    <input placeholder='Activity name...' type='text' name='name' onChange={changeHandler}></input>
                    {error.nameError ? <span className='error'>{error.nameError}</span> : null}
                </div>

                <div className='difficulty'>
                    <label>Difficulty: </label>
                    <label>1</label>
                    <input type="radio" name="difficulty" value="1" onChange={changeHandler}></input>
                    <label>2</label>
                    <input type="radio" name="difficulty" value="2" onChange={changeHandler}></input>
                    <label>3</label>
                    <input type="radio" name="difficulty" value="3" onChange={changeHandler}></input>
                    <label>4</label>
                    <input type="radio" name="difficulty" value="4" onChange={changeHandler}></input>
                    <label>5</label>
                    <input type="radio" name="difficulty" value="5" onChange={changeHandler}></input>
                    {error.difficultyError ? <span className='error'>{error.difficultyError}</span> : null}
                </div>

                <div className='duration'>
                    <label>Duration: </label>
                    <input name='duration' type='number' placeholder='In hours... (ex. 1, 2, 3.5)' onChange={changeHandler}></input>
                    {error.durationError ? <span className='error'>{error.durationError}</span> : null}
                </div>

                <div className='season'>
                    <label>Season: </label>
                    <select name='season' onChange={changeHandler}>
                        <option value="">---</option>
                        <option value="Summer">Summer</option>
                        <option value="Fall">Fall</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>
                    </select>
                    {error.seasonError ? <span className='error'>{error.seasonError}</span> : null}
                </div>

                <div className='countries'>
                    <ul className="selectedCountries">
                        {state.selectedCountries.map((country) => {
                            return <li className="item" key={country}>
                                <span className='item-name'>{country}</span>
                                <button className="item-close" name="list" value={country} onClick={removeFromList}>✖</button>
                            </li>
                        })}

                    </ul>
                    <label>Countries: </label>
                    <select name="countries" onChange={changeHandler}>
                        <option value="">---</option>
                        {sortedCountries.map((country) => {
                            return <option key={country.ID} value={country.name}>{country.name}</option>
                        })}
                    </select>
                    {error.selectedCountriesError ? <span className='error'>{error.selectedCountriesError}</span> : null}
                </div>

                <div className="button-container">
                    <button name="submit" type='submit' className='submit-btn' onClick={clickHandler}>CREATE ACTIVITY</button>
                </div>

            </form>
        </div>
    )
}