import { CrisisAlert, GpsFixed, LocalHospital, Public, Search } from '@mui/icons-material';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchFilters from '../components/SearchFilters.jsx';
import { getLabels } from '../i18n/translations.js';

export default function HomePage() {
  const language = useSelector((state) => state.preferences.language);
  const labels = getLabels(language);
  const quickCards = [
    { title: labels.emergencyHospitals, icon: CrisisAlert, query: labels.emergencyAvailable },
    { title: labels.nearbyPublicCare, icon: GpsFixed, query: labels.nearbyPublicCareText },
    { title: labels.governmentNetwork, icon: Public, query: labels.governmentNetworkText }
  ];

  return (
    <div className="space-y-8">
      <section className="grid items-center gap-8 overflow-hidden rounded-lg bg-gradient-to-br from-cyan-50 via-white to-emerald-50 p-5 shadow-glass dark:from-slate-900 dark:via-slate-800 dark:to-teal-950 md:grid-cols-[1.05fr_0.95fr] md:p-10">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <Typography variant="overline" color="primary" className="font-bold">
            {labels.heroOverline}
          </Typography>
          <Typography variant="h2" className="max-w-3xl text-4xl font-extrabold md:text-6xl">
            {labels.heroTitle}
          </Typography>
          <Typography variant="h6" className="max-w-2xl text-slate-600 dark:text-slate-300">
            {labels.heroSubtitle}
          </Typography>
          <div className="flex flex-wrap gap-3">
            <Button component={Link} to="/hospitals" variant="contained" size="large" startIcon={<Search />}>
              {labels.searchHospitals}
            </Button>
            <Button href="tel:108" color="error" variant="outlined" size="large" startIcon={<CrisisAlert />}>
              {labels.quickDial}
            </Button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="min-h-[320px]">
          <img
            className="h-full max-h-[460px] w-full rounded-lg object-cover"
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1100&q=80"
            alt="Healthcare professionals in a modern hospital"
          />
        </motion.div>
      </section>

      <SearchFilters />

      <Grid container spacing={3}>
        {quickCards.map((card) => {
          const Icon = card.icon;
          return (
            <Grid item xs={12} md={4} key={card.title}>
              <Paper className="glass h-full rounded-lg p-5">
                <Icon color="primary" fontSize="large" />
                <Typography variant="h6" className="mt-3">
                  {card.title}
                </Typography>
                <Typography variant="body2" className="mt-2 text-slate-600 dark:text-slate-300">
                  {card.query}
                </Typography>
                <Button component={Link} to="/hospitals" sx={{ mt: 2 }}>
                  {labels.nearby}
                </Button>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <section className="rounded-lg bg-white p-5 shadow-sm dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-4">
          <LocalHospital color="primary" fontSize="large" />
          <div>
            <Typography variant="h5">{labels.serviceTitle}</Typography>
            <Typography className="text-slate-600 dark:text-slate-300">
              {labels.serviceText}
            </Typography>
          </div>
        </div>
      </section>
    </div>
  );
}
