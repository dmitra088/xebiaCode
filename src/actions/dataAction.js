import axios from 'axios';
export const GET_ACCESS_SUCCESS = 'GET_ACCESS_SUCCESS';
export const GET_ACCESS_FAILURE = 'GET_ACCESS_FAILURE';
export const GET_PLANETS = 'GET_PLANETS';
export const LOGOUT = 'LOGOUT';

export const getAccess = (userName, password, props) => {
    return function (dispatch) {
        try {
            axios.get(`https://swapi.co/api/people/?search=${userName}`)
                .then(result => {
                    let data = result.data.results[0];
                    if (result.data.count > 0 && data.name === userName && data.birth_year === password) {
                        dispatch({
                            type: GET_ACCESS_SUCCESS,
                            payload: data
                        });
                        props.history.push('/search/');
                    }
                    else {
                        dispatch({
                            type: GET_ACCESS_FAILURE
                        });
                    }
                })
        }
        catch{
            dispatch({
                type: GET_ACCESS_FAILURE
            });
        }
    }
}


export const getPlanetsList = () => {
    return function (dispatch) {
        try {
            axios.get(`https://swapi.co/api/planets/`)
                .then(result => {
                    let data = result.data.results;
                    dispatch({
                        type: GET_PLANETS,
                        payload: data
                    });
                })
        }
        catch{
            dispatch({
                type: GET_ACCESS_FAILURE
            });
        }
    }
}

export const logout = (props) => {
    return function (dispatch) {
        props.history.push('/');
        dispatch({
            type: LOGOUT
        });
    }
}
