import { Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <Paper className="mx-auto max-w-2xl p-8 text-center">
      <Typography variant="h3">Page not found</Typography>
      <Typography className="mt-3 text-slate-600 dark:text-slate-300">
        The healthcare service page you requested is unavailable.
      </Typography>
      <Button component={Link} to="/" variant="contained" sx={{ mt: 4 }}>
        Return home
      </Button>
    </Paper>
  );
}
