import {
  AccessTime,
  Call,
  Directions,
  Favorite,
  FavoriteBorder,
  LocalHospital,
  LocationOn
} from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Rating, Tooltip, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/preferencesSlice.js';
import { getLabels } from '../i18n/translations.js';

export default function HospitalCard({ hospital }) {
  const dispatch = useDispatch();
  const { favorites, language } = useSelector((state) => state.preferences);
  const labels = getLabels(language);
  const isFavorite = favorites.includes(hospital.id);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`;

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Card className="h-full overflow-hidden">
        <div className="image-overlay">
          <CardMedia component="img" height="190" image={hospital.imageUrl} alt={hospital.name} />
          <Chip
            className="!absolute bottom-3 left-3 z-10 !font-extrabold"
            label={`${hospital.rating} ★`}
            color="primary"
            size="small"
          />
        </div>
        <CardContent className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <Typography variant="h6" className="leading-tight">
              {hospital.name}
            </Typography>
            <Tooltip title={isFavorite ? labels.removeFavorite : labels.saveFavorite}>
              <IconButton className="!bg-cyan-50 dark:!bg-cyan-950/40" color="primary" onClick={() => dispatch(toggleFavorite(hospital.id))}>
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Tooltip>
          </div>
          <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
            <LocationOn fontSize="small" />
            <span>
              {hospital.address}, {hospital.village}, {hospital.city}, {hospital.state}, {hospital.country}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip
              icon={<LocalHospital />}
              label={hospital.emergencyAvailable ? labels.emergencyAvailable : labels.noEmergency}
              color={hospital.emergencyAvailable ? 'success' : 'default'}
              size="small"
            />
            <Chip icon={<AccessTime />} label={hospital.openingHours} size="small" />
          </div>
          <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
            <Rating value={hospital.rating} precision={0.1} readOnly size="small" />
            <Typography variant="body2">{hospital.bedsAvailable} {labels.beds}</Typography>
          </div>
        </CardContent>
        <CardActions className="px-4 pb-4">
          <Button component={Link} to={`/hospitals/${hospital.id}`} variant="contained" fullWidth>
            {labels.details}
          </Button>
          <Tooltip title={labels.callHospital}>
            <IconButton color="primary" href={`tel:${hospital.contactNumber}`}>
              <Call />
            </IconButton>
          </Tooltip>
          <Tooltip title={labels.openGoogleMaps}>
            <IconButton color="primary" href={mapsUrl} target="_blank" rel="noreferrer">
              <Directions />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </motion.div>
  );
}
