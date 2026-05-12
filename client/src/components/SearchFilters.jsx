import { Autocomplete, Button, Grid, MenuItem, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, setFilter } from '../store/hospitalsSlice.js';
import { getSuggestions, getUniqueOptions } from '../utils/filterHospitals.js';
import { translations } from '../i18n/translations.js';

const filterFields = [
  { key: 'village', label: 'Village' },
  { key: 'city', label: 'City' },
  { key: 'state', label: 'State' },
  { key: 'country', label: 'Country' }
];

export default function SearchFilters({ compact = false }) {
  const dispatch = useDispatch();
  const { items, filters } = useSelector((state) => state.hospitals);
  const { language } = useSelector((state) => state.preferences);
  const labels = translations[language] || translations.en;

  return (
    <div className="glass rounded-lg p-4">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={compact ? 12 : 4}>
          <Autocomplete
            freeSolo
            options={getSuggestions(items)}
            value={filters.search}
            onInputChange={(_, value) => dispatch(setFilter({ key: 'search', value }))}
            renderInput={(params) => <TextField {...params} label={labels.searchPlaceholder} />}
          />
        </Grid>
        {filterFields.map((field) => (
          <Grid item xs={12} sm={6} md={compact ? 6 : 2} key={field.key}>
            <TextField
              select
              fullWidth
              label={field.label}
              value={filters[field.key]}
              onChange={(event) => dispatch(setFilter({ key: field.key, value: event.target.value }))}
            >
              <MenuItem value="">All {field.label}s</MenuItem>
              {getUniqueOptions(items, field.key).map((option) => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        ))}
        <Grid item xs={12} md={compact ? 12 : 2}>
          <Button fullWidth variant="outlined" onClick={() => dispatch(clearFilters())}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
