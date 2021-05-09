import {combineReducers} from 'redux';
import user from './user_reducer'
import map from './map_reducer'

const rootReducer = combineReducers({
    user,
    map
})

export default rootReducer