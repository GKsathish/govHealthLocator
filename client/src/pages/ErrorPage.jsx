import { Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLabels } from '../i18n/translations.js';

export default function ErrorPage() {
  const language = useSelector((state) => state.preferences.language);
  const labels = getLabels(language);

  return (
    <Paper className="mx-auto max-w-2xl p-8 text-center">
      <Typography variant="h3">{labels.pageNotFound}</Typography>
      <Typography className="mt-3 text-slate-600 dark:text-slate-300">
        {labels.unavailablePage}
      </Typography>
      <Button component={Link} to="/" variant="contained" sx={{ mt: 4 }}>
        {labels.returnHome}
      </Button>
    </Paper>
  );
}
