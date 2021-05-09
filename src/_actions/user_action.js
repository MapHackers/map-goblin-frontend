import axios from 'axios'
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOAD_ALARM
} from './type.js'
import Api from "../../util/Api";

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
        .catch(err => err.response)

    return {
        type: REGISTER_USER,
        payload: request
    }

}

export function auth(token) {

    const request = axios.get('/api/authentication', {
        headers: {
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': `${token}`,
        }
    })
        .then(response => response)
        .catch(err => err.response)

    return {
        type: AUTH_USER,
        payload: request
    }

}

export function loadAlarm(userId){

    const request = Api.get(`/${userId}/alarms`)
        .then(response => response)
        .catch(error => error)

    return {
        type: LOAD_ALARM,
        payload: request
    }
}