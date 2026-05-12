import { Autocomplete, Button, Grid, MenuItem, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilters, setFilter } from '../store/hospitalsSlice.js';
import { filterHospitals, getSuggestions, getUniqueOptions } from '../utils/filterHospitals.js';
import { getLabels } from '../i18n/translations.js';

const filterFields = [
  { key: 'country', labelKey: 'country' },
  { key: 'state', labelKey: 'state' },
  { key: 'city', labelKey: 'city' },
  { key: 'village', labelKey: 'village' }
];

const parentFiltersFor = (key, filters) => {
  if (key === 'country') return {};
  if (key === 'state') return { country: filters.country };
  if (key === 'city') return { country: filters.country, state: filters.state };
  if (key === 'village') return { country: filters.country, state: filters.state, city: filters.city };
  return {};
};

export default function SearchFilters({ compact = false }) {
  const dispatch = useDispatch();
  const { countries, items, filters } = useSelector((state) => state.hospitals);
  const { language } = useSelector((state) => state.preferences);
  const labels = getLabels(language);

  const getOptions = (field) => {
    if (field.key === 'country') {
      const countriesWithHospitals = getUniqueOptions(items, 'country');
      return countriesWithHospitals.length ? countriesWithHospitals : countries;
    }

    const parentScopedHospitals = filterHospitals(items, {
      search: '',
      village: '',
      city: '',
      state: '',
      country: '',
      ...parentFiltersFor(field.key, filters)
    });

    return getUniqueOptions(parentScopedHospitals, field.key);
  };

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
              label={labels[field.labelKey]}
              value={filters[field.key]}
              onChange={(event) => dispatch(setFilter({ key: field.key, value: event.target.value }))}
            >
              <MenuItem value="">{labels.all} {labels[field.labelKey]}</MenuItem>
              {getOptions(field).map((option) => (
                <MenuItem value={option} key={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        ))}
        <Grid item xs={12} md={compact ? 12 : 2}>
          <Button fullWidth variant="outlined" onClick={() => dispatch(clearFilters())}>
            {labels.clear}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
