import { configureStore, combineReducers } from '@reduxjs/toolkit';
import user from './user';
import main from './main';
import alarm from './alarm';
import userInfo from './userInfo';
import repository from './repository';
import map from './map';

const rootReducer = combineReducers({
  user: user.reducer,
  main: main.reducer,
  alarm: alarm.reducer,
  userInfo: userInfo.reducer,
  repository: repository.reducer,
  map: map.reducer,
});

export default configureStore({
  reducer: rootReducer,
});
