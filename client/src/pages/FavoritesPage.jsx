import { Alert, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import HospitalCard from '../components/HospitalCard.jsx';
import { getLabels } from '../i18n/translations.js';

export default function FavoritesPage() {
  const { items } = useSelector((state) => state.hospitals);
  const { favorites, language } = useSelector((state) => state.preferences);
  const labels = getLabels(language);
  const savedHospitals = items.filter((hospital) => favorites.includes(hospital.id));

  return (
    <div className="space-y-5">
      <Typography variant="h3">{labels.savedHospitals}</Typography>
      {!savedHospitals.length && <Alert severity="info">{labels.noSavedHospitals}</Alert>}
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
