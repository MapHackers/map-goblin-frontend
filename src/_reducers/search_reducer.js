import {
    SEARCH_REPOSITORY,
    SEARCH_USER
} from "../_actions/type";

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = {
    searchRepo:[],
    searchUser:[]
}, action){
    switch (action.type) {
        case SEARCH_REPOSITORY:
            return {
                ...state,
                searchRepo: action.payload?.data.data
            }
        case SEARCH_USER:
            return {
                ...state,
                searchUser: action.payload?.data.data
            }
        default:
            return state
    }
}