import { configureStore } from '@reduxjs/toolkit';
import NavReducer from './slices/navSlices';

export const store = configureStore({
  reducer: {
    nav: NavReducer,
  },
});
