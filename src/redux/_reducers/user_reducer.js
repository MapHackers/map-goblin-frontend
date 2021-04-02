import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/type'

export default function (state = {}, action){
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload.data}

        case REGISTER_USER:
            return {...state, register: action.payload}
        
        case AUTH_USER:
            return {...state, userData: action.payload}

        default:
            return state;
    }
}