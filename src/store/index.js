import { configureStore, combineReducers } from '@reduxjs/toolkit';
import user from './user';
import repository from './repository';
import alarm from './alarm';

const rootReducer = combineReducers({
  user: user.reducer,
  repository: repository.reducer,
  alarm: alarm.reducer,
});

export default configureStore({
  reducer: rootReducer,
});
