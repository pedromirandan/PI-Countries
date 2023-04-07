import axios from "axios"
export const GET_COUNTRIES = "GET_COUNTRIES";
export const SEARCH_COUNTRIES = "SEARCH_COUNTRIES";
export const SORT_COUNTRIES = "SORT_COUNTRIES"
export const SET_COUNTRIES = "SET_COUNTRIES"
export const FILTER_COUNTRIES = "FILTER_COUNTRIES"
export const GET_ACTIVITIES = "GET_ACTIVITIES"


export const getCountries = () => {
  return (dispatch) => {
    axios.get("http://localhost:3001/countries")
      .then((response => {
        const { data } = response;
        dispatch({ type: GET_COUNTRIES, payload: data })
      }));
  };
};

export const searchCountries = (input) => {
  return (dispatch) => {
    axios.get(`http://localhost:3001/countries/name?name=${input}`)
      .then((response => {
        const { data } = response;
        console.log(data);
        dispatch({ type: SEARCH_COUNTRIES, payload: data });
      }))
      .catch((error) => {
        alert(error.response.data.ERROR)
      });
  };
};

export const sortCountries = (localState, inputCountries, reduxState, filter) => {
  return (dispatch) => {

    const { firstFilter, secondFilter } = localState;
    const { type, order } = firstFilter;
    const { continent, activity } = secondFilter;

    if (filter === "first") { // Si es del primer filtro.

      if (type === "ascendente") {

        inputCountries.sort((a, b) => {
          if (order === "alfabetico") {
            return a.name.localeCompare(b.name);
          } else {
            return a.population - b.population;
          }
        });

      } else { // Si es descendente

        inputCountries.sort((a, b) => {
          if (order === "alfabetico") {
            return b.name.localeCompare(a.name);
          } else {
            return b.population - a.population;
          }
        });

      }
      const result = [...inputCountries]

      dispatch({ type: SORT_COUNTRIES, payload: { result, inputCountries } }); //DESPACHAMOS PRIMER FILTRO

    } else { // Si es del segundo filtro..
      if (!(continent && activity)) { //Si se esta buscando por un solo filtro.
        if (continent) { //Si es por contiente.
          const result = inputCountries.filter((country) => country.continent === continent);
          dispatch({ type: SORT_COUNTRIES, payload: { result, inputCountries } }); //DESPACHAMOS 2 CONTINENTE
        } else { //Si es por activity.
          var targetActivity;
          reduxState.allActivities.forEach((e) => e.name === activity ? targetActivity = e : null);
          let { countries } = targetActivity;
          const countriesIDs = countries.map((e) => e.ID)
          const result = [];
          inputCountries.forEach((country) => {
            if (countriesIDs.includes(country.ID)) result.push(country)
          })
          dispatch({ type: SORT_COUNTRIES, payload: { result, inputCountries } }); //DESPACHAMOS 2 ACTIVITY
        }
      } else {
          reduxState.allActivities.forEach((e) => e.name === activity ? targetActivity = e : null);
          let { countries } = targetActivity;
          const countriesIDs = countries.map((e) => e.ID)
          const tempResult = [];
          inputCountries.forEach((country) => {
            if (countriesIDs.includes(country.ID)) tempResult.push(country)
          })
        const result = tempResult.filter((country) => country.continent === continent);
        console.log(result);
        dispatch({ type: SORT_COUNTRIES, payload: { result, inputCountries } }); //DESPACHAMOS 2 AMBOS
      }
    }
  };
};


export const setCountries = (lastState) => {
  return (dispatch) => {
    dispatch({ type: SET_COUNTRIES, payload: lastState })
  }
}

export const getActivities = () => {
  return (dispatch) => {
    axios.get("http://localhost:3001/activities")
      .then((response => {
        const { data } = response;
        dispatch({ type: GET_ACTIVITIES, payload: data })
      }));
  }
}