import { ArrowBack, Bed, Call, LocalHospital, LocalShipping, MedicalServices } from '@mui/icons-material';
import { Avatar, Button, Chip, Grid, Paper, Rating, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HospitalMap from '../components/HospitalMap.jsx';

export default function HospitalDetailsPage() {
  const { id } = useParams();
  const hospital = useSelector((state) => state.hospitals.items.find((item) => item.id === id || item._id === id));

  if (!hospital) {
    return (
      <Paper className="p-6">
        <Typography variant="h4">Hospital not found</Typography>
        <Button component={Link} to="/hospitals" startIcon={<ArrowBack />} sx={{ mt: 2 }}>
          Back to hospitals
        </Button>
      </Paper>
    );
  }

  return (
    <div className="space-y-6">
      <Button component={Link} to="/hospitals" startIcon={<ArrowBack />}>
        Back to hospitals
      </Button>
      <section className="grid gap-6 rounded-lg bg-white p-5 shadow-sm dark:bg-slate-900 md:grid-cols-[0.9fr_1.1fr]">
        <img className="h-full min-h-[320px] w-full rounded-lg object-cover" src={hospital.imageUrl} alt={hospital.name} />
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
            <Chip icon={<LocalHospital />} color="success" label={hospital.emergencyAvailable ? 'Emergency available' : 'No emergency'} />
            <Chip icon={<LocalShipping />} label={hospital.ambulanceAvailable ? 'Ambulance available' : 'No ambulance'} />
            <Chip icon={<Bed />} label={`${hospital.bedsAvailable} beds available`} />
            <Chip icon={<MedicalServices />} label={`${hospital.doctorsCount} doctors`} />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={`tel:${hospital.contactNumber}`} variant="contained" color="error" startIcon={<Call />}>
              Call {hospital.contactNumber}
            </Button>
            <Button
              href={`https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
            >
              Google Maps
            </Button>
          </div>
        </div>
      </section>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper className="h-full p-5">
            <Typography variant="h5">Departments</Typography>
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

      <Paper className="p-5">
        <Typography variant="h5">Reviews</Typography>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {hospital.reviews.map((review) => (
            <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-700" key={`${review.author}-${review.text}`}>
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
