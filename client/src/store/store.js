import { configureStore } from '@reduxjs/toolkit';
import hospitalsReducer from './hospitalsSlice.js';
import preferencesReducer from './preferencesSlice.js';

export const store = configureStore({
  reducer: {
    hospitals: hospitalsReducer,
    preferences: preferencesReducer
  }
});
