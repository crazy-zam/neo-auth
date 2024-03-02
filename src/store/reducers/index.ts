import userReducer from './userReducer';
import registrationReducer from './registrationReducer';
import checkUserReducer from './checkUserReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  user: userReducer,
  registration: registrationReducer,
  checkUser: checkUserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
