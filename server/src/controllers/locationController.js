import { Hospital } from '../models/Hospital.js';

export const getLocations = async (_req, res, next) => {
  try {
    const [villages, cities, states, countries] = await Promise.all([
      Hospital.distinct('village'),
      Hospital.distinct('city'),
      Hospital.distinct('state'),
      Hospital.distinct('country')
    ]);

    res.json({
      villages: villages.filter(Boolean).sort(),
      cities: cities.filter(Boolean).sort(),
      states: states.filter(Boolean).sort(),
      countries: countries.filter(Boolean).sort()
    });
  } catch (error) {
    next(error);
  }
};
