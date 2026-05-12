import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/db.js';
import { Hospital } from '../models/Hospital.js';
import { hospitalSeedData } from './hospitalSeedData.js';

dotenv.config();

const seed = async () => {
  await connectDatabase();
  await Hospital.deleteMany({});
  await Hospital.insertMany(hospitalSeedData);
  console.log(`Seeded ${hospitalSeedData.length} hospitals`);
  await mongoose.disconnect();
};

seed().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
