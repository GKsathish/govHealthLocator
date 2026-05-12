import { GpsFixed, LocalHospital, Map, MedicalServices } from '@mui/icons-material';
import { Alert, Button, Grid, Pagination, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HospitalCard from '../components/HospitalCard.jsx';
import HospitalMap from '../components/HospitalMap.jsx';
import LoadingSkeletons from '../components/LoadingSkeletons.jsx';
import SearchFilters from '../components/SearchFilters.jsx';
import { setPage } from '../store/hospitalsSlice.js';
import { filterHospitals } from '../utils/filterHospitals.js';
import { getLabels } from '../i18n/translations.js';

const distanceKm = (a, b) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const earthRadius = 6371;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);
  const value =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return earthRadius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
};

export default function HospitalListingPage() {
  const dispatch = useDispatch();
  const { items, filters, loading, error, page, pageSize } = useSelector((state) => state.hospitals);
  const language = useSelector((state) => state.preferences.language);
  const labels = getLabels(language);
  const [nearbyOnly, setNearbyOnly] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState('');

  const filtered = useMemo(() => {
    const base = filterHospitals(items, filters);
    if (!nearbyOnly || !location) return base;
    return [...base]
      .map((hospital) => ({ ...hospital, distance: distanceKm(location, hospital) }))
      .filter((hospital) => hospital.distance <= 100)
      .sort((a, b) => a.distance - b.distance);
  }, [items, filters, nearbyOnly, location]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleHospitals = filtered.slice((page - 1) * pageSize, page * pageSize);

  const findNearby = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        setNearbyOnly(true);
        setLocationError('');
      },
      () => setLocationError('Location permission was denied or unavailable.')
    );
  };

  return (
    <div className="space-y-6">
      <div className="glass page-heading flex flex-wrap items-center justify-between gap-4">
        <div>
          <Typography variant="h3">{labels.listingTitle}</Typography>
          <Typography className="text-slate-600 dark:text-slate-300">
            {filtered.length} {labels.matchingHospitals}
          </Typography>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="metric-pill"><LocalHospital fontSize="small" />{items.length}</span>
          <span className="metric-pill"><MedicalServices fontSize="small" />24/7</span>
          <span className="metric-pill"><Map fontSize="small" />Map</span>
          <Button variant={nearbyOnly ? 'contained' : 'outlined'} startIcon={<GpsFixed />} onClick={findNearby}>
            {labels.nearbyHospitals}
          </Button>
        </div>
      </div>
      <SearchFilters />
      {error && <Alert severity="info">{error}</Alert>}
      {locationError && <Alert severity="warning">{locationError}</Alert>}

      <HospitalMap hospitals={filtered} />

      {loading ? (
        <LoadingSkeletons />
      ) : (
        <Grid container spacing={3}>
          {visibleHospitals.map((hospital) => (
            <Grid item xs={12} md={6} lg={4} key={hospital.id}>
              <HospitalCard hospital={hospital} />
            </Grid>
          ))}
        </Grid>
      )}

      {!visibleHospitals.length && !loading && <Alert severity="warning">{labels.noMatches}</Alert>}

      <Stack alignItems="center" className="glass rounded-lg py-3">
        <Pagination count={pageCount} page={Math.min(page, pageCount)} onChange={(_, value) => dispatch(setPage(value))} color="primary" shape="rounded" />
      </Stack>
    </div>
  );
}
