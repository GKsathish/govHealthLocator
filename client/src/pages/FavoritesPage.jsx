import { Alert, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import HospitalCard from '../components/HospitalCard.jsx';

export default function FavoritesPage() {
  const { items } = useSelector((state) => state.hospitals);
  const favorites = useSelector((state) => state.preferences.favorites);
  const savedHospitals = items.filter((hospital) => favorites.includes(hospital.id));

  return (
    <div className="space-y-5">
      <Typography variant="h3">Saved Hospitals</Typography>
      {!savedHospitals.length && <Alert severity="info">No saved hospitals yet.</Alert>}
      <Grid container spacing={3}>
        {savedHospitals.map((hospital) => (
          <Grid item xs={12} md={6} lg={4} key={hospital.id}>
            <HospitalCard hospital={hospital} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
