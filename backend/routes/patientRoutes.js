import express from 'express'
const router = express.Router()
import { authPatient, deletePatient, getPatientById, getPatientProfile, registerPatient, updatePatient, updatePatientProfile } from '../controllers/patientController.js'
import { protect, patientAdmin } from '../middleware/authMiddleware.js'

router.route('/').post(registerPatient).get(protect, patientAdmin, getPatientById)
router.post('/login', authPatient)
router
  .route('/profile')
  .get(protect, getPatientProfile)
  .put(protect, updatePatientProfile)
router
  .route('/:id')
  .delete(protect, patientAdmin, deletePatient)
  .get(protect, patientAdmin, getPatientById)
  .put(protect, patientAdmin, updatePatient)

export default router