import userReducer from '@/store/reducers/userReducer';
import registrationReducer from '@/store/reducers/registrationReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  user: userReducer,
  registration: registrationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
