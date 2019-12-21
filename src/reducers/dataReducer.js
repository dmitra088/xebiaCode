import { GET_ACCESS_SUCCESS, GET_ACCESS_FAILURE, GET_PLANETS, LOGOUT } from '../actions/dataAction';

const initialState = {
    loginUser: "",
    loginFailure: false,
    planets: []
}

export default (state = initialState, action) => {
    let data = Object.assign({}, state);

    switch (action.type) {
        case GET_ACCESS_SUCCESS:
            data.loginUser = action.payload.name;
            data.loginFailure = false;
            return data;

        case GET_ACCESS_FAILURE:
            data.loginFailure = true;
            return data;

        case GET_PLANETS:
            data.planets = action.payload;
            return data;

        case LOGOUT:
            data.loginUser = "";
            return data;

        default:
            return state;
    }
}

