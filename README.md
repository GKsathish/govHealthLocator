# Government Healthcare Locator

A responsive full-stack website for finding government hospitals by village, city, state, and country. The app includes a React + MUI + Tailwind frontend, an Express REST API, MongoDB schema, dummy data, map view, admin management screens, favorites, dark/light mode, and multilingual labels.

## Tech Stack

- ReactJS, React Router, Material UI, Tailwind CSS
- Redux Toolkit, Axios, Framer Motion, Leaflet
- Node.js, Express, MongoDB, Mongoose
- Multer for image upload examples

## Project Structure

```text
client/   React frontend
server/   Express API and MongoDB models
```

## Installation

```bash
npm run install:all
```

Create environment files:

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

Update `server/.env` with your MongoDB connection string.

## Run Locally

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## Seed Dummy Hospitals

```bash
npm run seed --prefix server
```

## API Examples

```bash
GET    /api/hospitals
GET    /api/hospitals/:id
POST   /api/hospitals
PUT    /api/hospitals/:id
DELETE /api/hospitals/:id
GET    /api/locations
GET    /api/health
```

Query hospitals:

```bash
GET /api/hospitals?city=Hyderabad&state=Telangana&search=general&page=1&limit=6
```

## Deployment Guide

1. Build the frontend with `npm run build`.
2. Deploy `client/dist` to Netlify, Vercel, Azure Static Web Apps, or S3.
3. Deploy `server` to Render, Railway, Azure App Service, or a VM.
4. Set production environment variables:
   - `MONGO_URI`
   - `CLIENT_URL`
   - `VITE_API_BASE_URL`
5. Configure CORS to allow the deployed frontend origin.
6. Use MongoDB Atlas for production database hosting.

## Notes

The frontend gracefully falls back to local dummy data if the backend is unavailable, so the interface remains explorable during setup.
