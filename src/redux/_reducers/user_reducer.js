import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOAD_ALARM
} from '../_actions/type'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {
    id: "",
    userId: "",
    userToken: '',
    userEmail:'',
    userName:'',
    userDescription:'',
    userAlarm:[],
    isLogin: false,
}, action){
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload.data}

        case REGISTER_USER:
            return {...state, register: action.payload}
        
        case AUTH_USER:
            return {...state,
                userId: action.payload.data.userId,
                userName: action.payload.data.name,
                userEmail: action.payload.data.email,
                userDescription: action.payload.data.description,
            }
        case LOAD_ALARM:
            return {
                ...state,
                userAlarm: action.payload.data
            }
        default:
            return state;
    }
}