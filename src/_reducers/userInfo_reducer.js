import {
    LOAD_USER
} from "../_actions/type";

const initialState = {
    userId: '',
    userName: '',
    userEmail: '',
    description: '',
    profile: '',
    mapList: []
}

export default function(state = initialState, action){
    switch (action.type) {

        case LOAD_USER:
            if (action.payload.payload !== false){
                return {
                    ...state,
                    userId: action.payload?.data.userId,
                    userName: action.payload?.data.name,
                    userEmail: action.payload?.data.email,
                    description: action.payload?.data.description,
                    profile: action.payload?.data.profile,
                    mapList: action.payload?.data.mapList
                }
            } else {
                return {
                    ...state
                }
            }

        default:
            return state;
    }
}