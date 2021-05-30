import {combineReducers} from 'redux';
import user from './user_reducer'
import map from './map_reducer'
import alarm from "./alram_reducer";
import repository from "./repository_reducer";
import search from "./search_reducer"


const rootReducer = combineReducers({
    user,
    map,
    alarm,
    repository,
    search
})

export default rootReducer