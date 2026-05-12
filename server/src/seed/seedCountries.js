import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { connectDatabase } from '../config/db.js';
import { Country } from '../models/Country.js';
import { countryCodes } from './countryCodes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });

const seed = async () => {
  await connectDatabase();

  const countries = countryCodes
    .map((code) => ({ code, name: displayNames.of(code) }))
    .filter((country) => country.name && country.name !== country.code)
    .sort((a, b) => a.name.localeCompare(b.name));

  await Country.deleteMany({});
  await Country.insertMany(countries, { ordered: false });

  console.log(`Seeded ${countries.length} countries`);
  await mongoose.disconnect();
};

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
