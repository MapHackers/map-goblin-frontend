import {combineReducers} from 'redux';
import user from './user_reducer'
import map from './map_reducer'
import alarm from "./alram_reducer";

const rootReducer = combineReducers({
    user,
    map,
    alarm
})

export default rootReducer