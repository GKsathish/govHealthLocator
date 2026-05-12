import { createSlice } from '@reduxjs/toolkit';
import { detectRegionLanguage } from '../i18n/translations.js';

const initialState = {
  mode: localStorage.getItem('mode') || 'light',
  language: localStorage.getItem('language') || detectRegionLanguage(),
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]')
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleMode(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mode', state.mode);
    },
    setLanguage(state, action) {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },
    toggleFavorite(state, action) {
      const id = action.payload;
      state.favorites = state.favorites.includes(id)
        ? state.favorites.filter((favorite) => favorite !== id)
        : [...state.favorites, id];
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    }
  }
});

export const { setLanguage, toggleFavorite, toggleMode } = preferencesSlice.actions;
export default preferencesSlice.reducer;
