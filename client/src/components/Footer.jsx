import { Call, Favorite, HealthAndSafety, LocationOn, Mail, Shield } from '@mui/icons-material';
import { Button, Container, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLabels } from '../i18n/translations.js';

export default function Footer() {
  const language = useSelector((state) => state.preferences.language);
  const labels = getLabels(language);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-white/15 bg-gradient-to-r from-cyan-600/95 to-teal-600/95 text-white shadow-2xl shadow-cyan-950/20 backdrop-blur-xl dark:from-slate-950/95 dark:to-teal-950/95">
      <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 5 } }}>
        <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:gap-8">
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-cyan-700/70 p-2 text-white shadow-lg shadow-cyan-950/20">
                <HealthAndSafety fontSize="small" />
              </div>
              <div>
                <Typography variant="h6" className="!text-lg md:!text-xl">{labels.brand}</Typography>
                <Typography variant="body2" className="max-w-sm text-white/78">
                  {labels.footerTagline}
                </Typography>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="metric-pill"><Shield fontSize="small" />{labels.serviceStatus}</span>
              <Button href="tel:108" color="error" variant="contained" size="small" startIcon={<Call />}>
                {labels.quickDial}
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-3 md:border-0 md:bg-transparent md:p-0">
            <Typography variant="subtitle1" fontWeight={800} gutterBottom className="!mb-2">
              {labels.publicServices}
            </Typography>
            <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-3 md:grid-cols-1">
              <Link className="text-white/78 hover:text-white" to="/hospitals">
                {labels.hospitalDirectory}
              </Link>
              <Link className="text-white/78 hover:text-white" to="/favorites">
                <Favorite fontSize="inherit" /> {labels.favorites}
              </Link>
              <Link className="text-white/78 hover:text-white" to="/hospitals">
                <LocationOn fontSize="inherit" /> {labels.locationSearch}
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 p-3 md:border-0 md:bg-transparent md:p-0">
            <Typography variant="subtitle1" fontWeight={800} gutterBottom className="!mb-2">
              {labels.contactDesk}
            </Typography>
            <div className="grid gap-2 text-sm text-white/78">
              <a className="hover:text-white" href="tel:108">
                <Call fontSize="inherit" /> {labels.emergencyDial}: 108
              </a>
              <a className="hover:text-white" href="tel:104">
                <Call fontSize="inherit" /> {labels.helpline}: 104
              </a>
              <a className="hover:text-white" href="mailto:support@govcare.example">
                <Mail fontSize="inherit" /> support@govcare.example
              </a>
            </div>
          </div>
        </div>

        <Divider sx={{ my: { xs: 2, md: 3 }, borderColor: 'rgba(255,255,255,0.18)' }} />
        <div className="flex flex-col gap-1 text-xs text-white/72 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <span>© {year} {labels.brand}. {labels.rights}</span>
          <span>{labels.emergencySupport} · {labels.googleMaps}</span>
        </div>
      </Container>
    </footer>
  );
}
