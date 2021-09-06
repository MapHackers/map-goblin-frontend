import {
    SEARCH_SPACE,
    SEARCH_USER
} from "./type";
import Api from "../util/Api";

export function searchSpace(keyword){
    const request = Api.get(`/search/spaces/${keyword}`)
        .then(response => response)
        .catch(error => console.log(error))
    return {
        type: SEARCH_SPACE,
        payload: request
    }
}

export function searchUser(keyword){
    const request = Api.get(`/search/members/${keyword}`)
        .then(response => response)
        .catch(error => console.log(error))
    return {
        type: SEARCH_USER,
        payload: request
    }
}