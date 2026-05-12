import { Router } from 'express';
import {
  createHospital,
  deleteHospital,
  getHospitalById,
  getHospitals,
  updateHospital
} from '../controllers/hospitalController.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();

router.route('/').get(getHospitals).post(upload.single('image'), createHospital);
router.route('/:id').get(getHospitalById).put(upload.single('image'), updateHospital).delete(deleteHospital);

export default router;
