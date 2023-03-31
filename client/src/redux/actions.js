import axios from "axios"
export const GET_COUNTRIES = "GET_COUNTRIES";


export const getCountries = () => {
    return (dispatch) => {
        axios.get("http://localhost:3001/countries")
        .then((response => {
            const { data } = response;
            dispatch({type: GET_COUNTRIES, payload: data})
        }));
    };
};