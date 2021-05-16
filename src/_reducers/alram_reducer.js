import {
    LOAD_ALARM,
    DELETE_ALL_ALARM
} from '../_actions/type'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {
    userAlarm:[],
}, action){
    switch (action.type) {
        case LOAD_ALARM:
            return {
                ...state,
                userAlarm: action.payload.data
            }
        case DELETE_ALL_ALARM:
            return{
                ...state,
                userAlarm: {data: []}
            }
        default:
            return state;
    }
}