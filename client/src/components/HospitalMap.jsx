import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLabels } from '../i18n/translations.js';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export default function HospitalMap({ hospitals }) {
  const language = useSelector((state) => state.preferences.language);
  const labels = getLabels(language);
  const first = hospitals[0] || { latitude: 20.5937, longitude: 78.9629 };

  return (
    <div className="glass h-[420px] rounded-lg p-2">
      <MapContainer center={[first.latitude, first.longitude]} zoom={hospitals.length > 1 ? 5 : 11} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hospitals.map((hospital) => (
          <Marker key={hospital.id} position={[hospital.latitude, hospital.longitude]} icon={markerIcon}>
            <Popup>
              <Typography variant="subtitle2">{hospital.name}</Typography>
              <Typography variant="body2">{hospital.city}, {hospital.state}</Typography>
              <Button component={Link} to={`/hospitals/${hospital.id}`} size="small">
                {labels.viewDetails}
              </Button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
