import asyncHandler from 'express-async-handler'
import HealthRecord from '../models/healthRecordModel.js'

// @desc    Register a new hospital
// @route   POST /api/healthrecords
// @access  Public
const registerHealthRecord = asyncHandler(async (req, res) => {
    const { 
        symptoms,
        diagnosis,
        prescription,
        allergies,
        notes,
        patientEmail } = req.body

    
    const  hospital =  req.hospital._id
  
  
    const newHealthRecord = await HealthRecord.create({
        symptoms,
        diagnosis,
        prescription,
        allergies,
        notes,
        patientEmail,
        hospital,
    })
  
    if (newHealthRecord) {
      res.status(201).json({
        _id: newHealthRecord._id,
        symptoms: newHealthRecord.hospital,
        diagnosis: newHealthRecord.diagnosis,
        prescription: newHealthRecord.prescription,
        allergies: newHealthRecord.allergies,
        notes: newHealthRecord.notes,
        allergies: newHealthRecord.allergies,
        patientEmail: newHealthRecord.patientEmail,
        hospital: newHealthRecord.hospital,
      })
    } else {
      res.status(400)
      throw new Error('Invalid health record data')
    }
})


 // @desc    Gets patient health record
  // @route   POST /api/healthrecords/patient
  // @access  Public
  const patientHealthRecords = asyncHandler(async (req, res) => {
    const { email } = req.body
  
    //const healthRecords = []
    
  
    const healthRecords = await HealthRecord.find({ email }).populate('hospital', 'hospital email address')
    if (healthRecords) {
      res.json(healthRecords)
    } else {
      res.status(400)
      throw new Error('No Health Record')
    }
    
  })


export {
    registerHealthRecord,
    patientHealthRecords,
}