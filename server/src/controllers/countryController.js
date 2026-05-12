import { Country } from '../models/Country.js';

export const getCountries = async (_req, res, next) => {
  try {
    const countries = await Country.find({}).sort({ name: 1 });
    res.json(countries);
  } catch (error) {
    next(error);
  }
};
