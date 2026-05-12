import { Hospital } from '../models/Hospital.js';

const buildFilter = (query) => {
  const filter = {};
  ['village', 'city', 'state', 'country'].forEach((key) => {
    if (query[key]) filter[key] = new RegExp(`^${query[key]}$`, 'i');
  });
  if (query.search) filter.$text = { $search: query.search };
  return filter;
};

export const getHospitals = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
    const filter = buildFilter(req.query);
    const [items, total] = await Promise.all([
      Hospital.find(filter)
        .sort({ rating: -1, name: 1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Hospital.countDocuments(filter)
    ]);
    res.json({ items, total, page, pages: Math.ceil(total / limit) || 1 });
  } catch (error) {
    next(error);
  }
};

export const getHospitalById = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) {
      res.status(404);
      throw new Error('Hospital not found');
    }
    res.json(hospital);
  } catch (error) {
    next(error);
  }
};

export const createHospital = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl
    };
    const hospital = await Hospital.create(payload);
    res.status(201).json(hospital);
  } catch (error) {
    next(error);
  }
};

export const updateHospital = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl
    };
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true
    });
    if (!hospital) {
      res.status(404);
      throw new Error('Hospital not found');
    }
    res.json(hospital);
  } catch (error) {
    next(error);
  }
};

export const deleteHospital = async (req, res, next) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) {
      res.status(404);
      throw new Error('Hospital not found');
    }
    res.json({ message: 'Hospital deleted' });
  } catch (error) {
    next(error);
  }
};
