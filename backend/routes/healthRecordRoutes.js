import express from 'express'
import { registerHealthRecord } from '../controllers/healthRecordController.js'
const router = express.Router()
import { protect, hospitalVerified, hospitalAdmin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, registerHealthRecord)


export default router