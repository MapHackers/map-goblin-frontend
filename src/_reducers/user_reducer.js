import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    EDIT_USER,
} from '../_actions/type'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {
    userName: '',
    userToken: '',
    loginStatus: '',
}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload.data }

        case REGISTER_USER:
            return { ...state, register: action.payload }

        case AUTH_USER:
            return {
                ...state,
                id: action.payload.data.id,
                userToken: action.payload.data.token,
                loginStatus: action.payload.statusText,
                userName: action.payload.data.name,
                userId: action.payload.data.userId,
                userEmail: action.payload.data.email,
                description: action.payload.data.description,
                profile: action.payload.data.profile,
                userData: action.payload
            }
        case EDIT_USER:
            return {
                ...state,
                userName: action.payload.data.userName,
                description: action.payload.data.description,
                profile: action.payload.data.profile
            }

        default:
            return state;
    }
}