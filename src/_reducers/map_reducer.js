import {
    LOAD_MAP_DATA,
    ADD_MAP_DATA
} from '../_actions/type'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {
    layers: null
}, action) {
    switch (action.type) {
        case LOAD_MAP_DATA:
            return { ...state, layers: action.payload.data }
        case ADD_MAP_DATA:
            return { ...state, layers: action.payload.data }
        default:
            return state;
    }

}