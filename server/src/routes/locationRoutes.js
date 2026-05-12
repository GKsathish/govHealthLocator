import { Router } from 'express';
import { getLocations } from '../controllers/locationController.js';

const router = Router();

router.get('/', getLocations);

export default router;
