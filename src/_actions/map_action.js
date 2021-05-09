import Api from "../util/Api";

import {
    LOAD_MAP_DATA
} from './type'

export function loadMapData(mapId) {
    //dataToSubmit = {"mapId" : {mapId}}
    const request = Api.get('/mapdata/' + mapId)
        .then(response => response)
        .catch(err => err.response)

    return {
        type: LOAD_MAP_DATA,
        payload: request
    }
}