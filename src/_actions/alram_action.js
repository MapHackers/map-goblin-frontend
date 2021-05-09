import {LOAD_ALARM} from "./type";
import Api from "../util/Api";

export function loadAlarm(userId){

    const request = Api.get(`/${userId}/alarms`)
        .then(response => response)
        .catch(error => error)

    return {
        type: LOAD_ALARM,
        payload: request
    }
}