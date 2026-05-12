import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient } from '../api/apiClient.js';
import { hospitalsSeed } from '../data/hospitals.js';

const normalize = (hospital) => ({
  ...hospital,
  id: hospital.id || hospital._id
});

export const fetchHospitals = createAsyncThunk('hospitals/fetchHospitals', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/hospitals', { params: { limit: 100 } });
    return (data.items || data || []).map(normalize);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchCountries = createAsyncThunk('hospitals/fetchCountries', async (_, { rejectWithValue }) => {
  try {
    const { data } = await apiClient.get('/countries');
    return data.map((country) => country.name).filter(Boolean);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  items: hospitalsSeed,
  countries: [...new Set(hospitalsSeed.map((hospital) => hospital.country))].sort(),
  loading: false,
  countriesLoading: false,
  error: null,
  filters: {
    search: '',
    village: '',
    city: '',
    state: '',
    country: ''
  },
  page: 1,
  pageSize: 6
};

const hospitalsSlice = createSlice({
  name: 'hospitals',
  initialState,
  reducers: {
    setFilter(state, action) {
      const { key, value } = action.payload;
      state.filters[key] = value;

      if (key === 'country') {
        state.filters.state = '';
        state.filters.city = '';
        state.filters.village = '';
      }
      if (key === 'state') {
        state.filters.city = '';
        state.filters.village = '';
      }
      if (key === 'city') {
        state.filters.village = '';
      }

      state.page = 1;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    clearFilters(state) {
      state.filters = initialState.filters;
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    addHospital(state, action) {
      state.items.unshift({ ...action.payload, id: action.payload.id || crypto.randomUUID() });
    },
    updateHospital(state, action) {
      const index = state.items.findIndex((hospital) => hospital.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteHospital(state, action) {
      state.items = state.items.filter((hospital) => hospital.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHospitals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHospitals.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.length ? action.payload : hospitalsSeed;
      })
      .addCase(fetchHospitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unable to load live API data. Showing demo hospitals.';
      })
      .addCase(fetchCountries.pending, (state) => {
        state.countriesLoading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countriesLoading = false;
        state.countries = action.payload.length ? action.payload : state.countries;
      })
      .addCase(fetchCountries.rejected, (state) => {
        state.countriesLoading = false;
      });
  }
});

export const { addHospital, clearFilters, deleteHospital, setFilter, setFilters, setPage, updateHospital } =
  hospitalsSlice.actions;

export default hospitalsSlice.reducer;
