import { Country } from '../models/Country.js';
import { Hospital } from '../models/Hospital.js';

export const getLocations = async (_req, res, next) => {
  try {
    const [villages, cities, states, hospitalCountries, countryDocs] = await Promise.all([
      Hospital.distinct('village'),
      Hospital.distinct('city'),
      Hospital.distinct('state'),
      Hospital.distinct('country'),
      Country.find({}).sort({ name: 1 }).select('name code')
    ]);

    res.json({
      villages: villages.filter(Boolean).sort(),
      cities: cities.filter(Boolean).sort(),
      states: states.filter(Boolean).sort(),
      countries: countryDocs.length ? countryDocs.map((country) => country.name) : hospitalCountries.filter(Boolean).sort(),
      countryRecords: countryDocs
    });
  } catch (error) {
    next(error);
  }
};
