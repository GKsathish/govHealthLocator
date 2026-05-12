import { ArrowBack, Bed, Call, LocalHospital, LocalShipping, MedicalServices } from '@mui/icons-material';
import { Avatar, Button, Chip, Grid, Paper, Rating, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HospitalMap from '../components/HospitalMap.jsx';
import { getLabels } from '../i18n/translations.js';

export default function HospitalDetailsPage() {
  const { id } = useParams();
  const hospital = useSelector((state) => state.hospitals.items.find((item) => item.id === id || item._id === id));
  const language = useSelector((state) => state.preferences.language);
  const labels = getLabels(language);

  if (!hospital) {
    return (
      <Paper className="p-6">
        <Typography variant="h4">{labels.hospitalNotFound}</Typography>
        <Button component={Link} to="/hospitals" startIcon={<ArrowBack />} sx={{ mt: 2 }}>
          {labels.backToHospitals}
        </Button>
      </Paper>
    );
  }

  return (
    <div className="space-y-6">
      <Button component={Link} to="/hospitals" startIcon={<ArrowBack />}>
        {labels.backToHospitals}
      </Button>
      <section className="glass grid gap-6 rounded-lg p-5 md:grid-cols-[0.9fr_1.1fr]">
        <img className="hero-image h-full min-h-[320px] w-full rounded-lg object-cover" src={hospital.imageUrl} alt={hospital.name} />
        <div className="space-y-4">
          <Typography variant="h3">{hospital.name}</Typography>
          <Typography className="text-slate-600 dark:text-slate-300">
            {hospital.address}, {hospital.village}, {hospital.city}, {hospital.state}, {hospital.country}
          </Typography>
          <div className="flex items-center gap-2">
            <Rating value={hospital.rating} precision={0.1} readOnly />
            <Typography>{hospital.rating}</Typography>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip icon={<LocalHospital />} color="success" label={hospital.emergencyAvailable ? labels.emergencyAvailable : labels.noEmergency} />
            <Chip icon={<LocalShipping />} label={hospital.ambulanceAvailable ? labels.ambulanceAvailable : labels.noAmbulance} />
            <Chip icon={<Bed />} label={`${hospital.bedsAvailable} ${labels.bedsAvailable}`} />
            <Chip icon={<MedicalServices />} label={`${hospital.doctorsCount} ${labels.doctors}`} />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={`tel:${hospital.contactNumber}`} variant="contained" color="error" startIcon={<Call />}>
              {labels.callHospital} {hospital.contactNumber}
            </Button>
            <Button
              href={`https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
            >
              {labels.googleMaps}
            </Button>
          </div>
        </div>
      </section>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper className="glass h-full p-5">
            <Typography variant="h5" className="section-title">{labels.departments}</Typography>
            <div className="mt-4 flex flex-wrap gap-2">
              {hospital.departments.map((department) => (
                <Chip key={department} label={department} />
              ))}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <HospitalMap hospitals={[hospital]} />
        </Grid>
      </Grid>

      <Paper className="glass p-5">
        <Typography variant="h5" className="section-title">{labels.reviews}</Typography>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {hospital.reviews.map((review) => (
            <div className="surface-card rounded-lg border border-cyan-100 bg-white/70 p-4 dark:border-cyan-900/50 dark:bg-slate-900/50" key={`${review.author}-${review.text}`}>
              <div className="flex items-center gap-3">
                <Avatar>{review.author.slice(0, 1)}</Avatar>
                <div>
                  <Typography fontWeight={700}>{review.author}</Typography>
                  <Rating value={review.rating} readOnly size="small" />
                </div>
              </div>
              <Typography className="mt-3 text-slate-600 dark:text-slate-300">{review.text}</Typography>
            </div>
          ))}
        </div>
      </Paper>
    </div>
  );
}
