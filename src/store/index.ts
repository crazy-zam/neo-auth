import { rootReducer } from '@/store/reducers/index';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: rootReducer,
});
