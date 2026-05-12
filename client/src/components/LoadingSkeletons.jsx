import { Grid, Skeleton } from '@mui/material';

export default function LoadingSkeletons() {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid item xs={12} md={6} lg={4} key={index}>
          <Skeleton variant="rounded" height={360} />
        </Grid>
      ))}
    </Grid>
  );
}
