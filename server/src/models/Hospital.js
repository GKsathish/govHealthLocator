import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    author: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5, default: 4 }
  },
  { _id: false }
);

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    address: { type: String, required: true, trim: true },
    village: { type: String, trim: true, index: true },
    city: { type: String, required: true, trim: true, index: true },
    state: { type: String, required: true, trim: true, index: true },
    country: { type: String, required: true, trim: true, index: true },
    contactNumber: { type: String, required: true, trim: true },
    emergencyAvailable: { type: Boolean, default: false },
    openingHours: { type: String, default: '24 hours' },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    departments: [{ type: String, trim: true }],
    doctorsCount: { type: Number, default: 0, min: 0 },
    bedsAvailable: { type: Number, default: 0, min: 0 },
    ambulanceAvailable: { type: Boolean, default: false },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: [reviewSchema],
    imageUrl: { type: String, trim: true }
  },
  { timestamps: true }
);

hospitalSchema.index({
  name: 'text',
  address: 'text',
  village: 'text',
  city: 'text',
  state: 'text',
  country: 'text'
});

export const Hospital = mongoose.model('Hospital', hospitalSchema);
