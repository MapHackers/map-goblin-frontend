import Api from "../util/Api";
import {LOAD_USER} from "./type.js";


export function loadUser(userId) {
    const request = Api.get(`/members/${userId}`)
        .then(response => response)
        .catch(e => {
            return {
                type: LOAD_USER,
                payload: false,
                status: e.response.status
            }
        })

    return {
        type: LOAD_USER,
        payload: request
    }
}