import axios from 'axios'
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './type.js'

export function loginUser(dataToSubmit) {
   
    const request = axios.post('/api/login', dataToSubmit)
    .then(response => response)
    .catch(err => err.response)

    return {
        type: LOGIN_USER,
        payload: request
    }

}

export function registerUser(dataToSubmit) {
   
    const request = axios.post('/api/members', dataToSubmit)
    .then(response => response)
    .catch(err => err.response )

    return {
        type: REGISTER_USER,
        payload: request
    }

}

export function auth() {
   
    const request = axios.get('/api/authentication')
    .then(response => response)
    .catch(err => err.response)

    return {
        type: AUTH_USER,
        payload: request
    }

}