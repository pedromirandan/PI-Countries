import { GET_ACTIVITIES, GET_COUNTRIES, SEARCH_COUNTRIES, SET_COUNTRIES, SORT_COUNTRIES } from "./actions";

const initialState = {
    allCountries: [],
    countries: [],
    preFilterCountries: [],
    allActivities: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
                preFilterCountries: action.payload,
            }

        case SEARCH_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                preFilterCountries: action.payload
            }

        case SORT_COUNTRIES:
                const { result, inputCountries } = action.payload;
                return {
                    ...state,
                    countries: result,
                    preFilterCountries: inputCountries
                }

        case SET_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            }

        case GET_ACTIVITIES:
            return {
                ...state,
                allActivities: action.payload
            }

        default:
            return { ...state }
    }
}

export default rootReducer;