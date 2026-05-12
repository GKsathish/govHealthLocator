import { Delete, Edit, Save } from '@mui/icons-material';
import {
  Alert,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHospital, deleteHospital, updateHospital } from '../store/hospitalsSlice.js';
import { getLabels } from '../i18n/translations.js';

const emptyForm = {
  id: '',
  name: '',
  address: '',
  village: '',
  city: '',
  state: '',
  country: '',
  contactNumber: '',
  openingHours: '24 hours',
  latitude: '',
  longitude: '',
  doctorsCount: '',
  bedsAvailable: '',
  imageUrl: ''
};

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { countries, items: hospitals } = useSelector((state) => state.hospitals);
  const language = useSelector((state) => state.preferences.language);
  const labels = getLabels(language);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const isEditing = Boolean(form.id);

  const requiredFields = useMemo(() => ['name', 'address', 'city', 'state', 'country', 'contactNumber'], []);

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const editHospital = (hospital) => {
    setForm({
      ...emptyForm,
      ...hospital,
      latitude: String(hospital.latitude),
      longitude: String(hospital.longitude),
      doctorsCount: String(hospital.doctorsCount),
      bedsAvailable: String(hospital.bedsAvailable)
    });
    setError('');
  };

  const submitHospital = (event) => {
    event.preventDefault();
    const missing = requiredFields.find((field) => !form[field].trim());
    if (missing) {
      setError(`${labels.fieldRequired} ${labels[missing] || missing}.`);
      return;
    }

    const payload = {
      ...form,
      id: form.id || `hospital-${Date.now()}`,
      latitude: Number(form.latitude || 20.5937),
      longitude: Number(form.longitude || 78.9629),
      doctorsCount: Number(form.doctorsCount || 0),
      bedsAvailable: Number(form.bedsAvailable || 0),
      emergencyAvailable: true,
      ambulanceAvailable: true,
      departments: ['Emergency', 'General Medicine'],
      rating: 4,
      reviews: [],
      imageUrl:
        form.imageUrl ||
        'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80'
    };

    dispatch(isEditing ? updateHospital(payload) : addHospital(payload));
    setForm(emptyForm);
    setError('');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) updateField('imageUrl', URL.createObjectURL(file));
  };

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h3">{labels.adminTitle}</Typography>
        <Typography className="text-slate-600 dark:text-slate-300">{labels.adminSubtitle}</Typography>
      </div>

      <Paper component="form" onSubmit={submitHospital} className="p-5">
        <Typography variant="h5" className="mb-4">
          {isEditing ? labels.editHospital : labels.addHospital}
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Grid container spacing={2}>
          {[
            ['name', labels.hospitalName],
            ['contactNumber', labels.contactNumber],
            ['address', labels.address],
            ['village', labels.village],
            ['city', labels.city],
            ['state', labels.state],
            ['openingHours', labels.openingHours],
            ['latitude', labels.latitude],
            ['longitude', labels.longitude],
            ['doctorsCount', labels.doctorsCount],
            ['bedsAvailable', labels.bedsField],
            ['imageUrl', labels.imageUrl]
          ].map(([key, label]) => (
            <Grid item xs={12} md={key === 'address' || key === 'imageUrl' ? 6 : 3} key={key}>
              <TextField fullWidth label={label} value={form[key]} onChange={(event) => updateField(key, event.target.value)} />
            </Grid>
          ))}
          <Grid item xs={12} md={3}>
            <TextField
              select
              fullWidth
              label={labels.country}
              value={form.country}
              onChange={(event) => updateField('country', event.target.value)}
            >
              <MenuItem value="">{labels.selectCountry}</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country} key={country}>
                  {country}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button component="label" variant="outlined" fullWidth sx={{ height: '56px' }}>
              {labels.uploadImage}
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button type="submit" variant="contained" fullWidth sx={{ height: '56px' }} startIcon={<Save />}>
              {isEditing ? labels.saveChanges : labels.addHospital}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper className="overflow-x-auto p-2">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{labels.hospitalName}</TableCell>
              <TableCell>{labels.location}</TableCell>
              <TableCell>{labels.contact}</TableCell>
              <TableCell align="right">{labels.actions}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hospitals.map((hospital) => (
              <TableRow key={hospital.id}>
                <TableCell>{hospital.name}</TableCell>
                <TableCell>{hospital.city}, {hospital.state}, {hospital.country}</TableCell>
                <TableCell>{hospital.contactNumber}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => editHospital(hospital)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => dispatch(deleteHospital(hospital.id))}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
