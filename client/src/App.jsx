import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import HomePage from './pages/HomePage.jsx';
import HospitalDetailsPage from './pages/HospitalDetailsPage.jsx';
import HospitalListingPage from './pages/HospitalListingPage.jsx';
import { fetchCountries, fetchHospitals } from './store/hospitalsSlice.js';
import { createAppTheme } from './theme.js';

export default function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.preferences.mode);
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  useEffect(() => {
    dispatch(fetchHospitals());
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/hospitals" element={<HospitalListingPage />} />
            <Route path="/hospitals/:id" element={<HospitalDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/404" element={<ErrorPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
