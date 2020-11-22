import express from 'express'
const router = express.Router()
import { authHospital, deleteHospital, getHospitalById, getHospitalProfile, registerHospital, updateHospital, updateHospitalProfile } from '../controllers/hospitalController.js'
import { protect, hospitalVerified, hospitalAdmin } from '../middleware/authMiddleware.js'

router.route('/').post(registerHospital).get(protect, hospitalAdmin, getHospitalById)
router.route('/login').post(authHospital)
router
  .route('/profile')
  .get(protect, getHospitalProfile)
  .put(protect, updateHospitalProfile)
router
  .route('/:id')
  .delete(protect, hospitalAdmin, deleteHospital)
  .get(protect, hospitalAdmin, getHospitalById)
  .put(protect, hospitalAdmin, updateHospital)

export default router