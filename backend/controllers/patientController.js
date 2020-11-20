import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Patient from '../models/patientModel.js'

// @desc    Auth user & get token
// @route   POST /api/patients/login
// @access  Public
const authPatient = asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    const patient = await Patient.findOne({ email })
  
    if (patient && (await patient.matchPassword(password))) {
      res.json({
        _id: patient._id,
        firstname: patient.firstname,
        lastname: patient.lastname,
        gender: patient.gender,
        genotype: patient.genotype,
        address: patient.address,
        email: patient.email,
        isAdmin: patient.isAdmin,
        token: generateToken(patient._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  })
  
  // @desc    Register a new patient
  // @route   POST /api/patients
  // @access  Public
  const registerPatient = asyncHandler(async (req, res) => {
    const { 
        firstname, 
        lastname, 
        email, 
        gender,
        age,
        genotype,
        address,
        password } = req.body
  
    const patientExists = await Patient.findOne({ email })
  
    if (patientExists) {
      res.status(400)
      throw new Error('Patient already exists')
    }
  
    const patient = await Patient.create({
        firstname, 
        lastname, 
        email, 
        gender,
        age,
        genotype,
        address,
        password,
    })
  
    if (patient) {
      res.status(201).json({
        _id: patient._id,
        firstname: patient.firstname,
        lastname: patient.lastname,
        gender: patient.gender,
        genotype: patient.genotype,
        address: patient.address,
        email: patient.email,
        isAdmin: patient.isAdmin,
        token: generateToken(patient._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid patient data')
    }
  })
  
  // @desc    Get patients profile
  // @route   GET /api/patients/profile
  // @access  Private
  const getPatientProfile = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.patient._id)
  
    if (patient) {
      res.json({
        _id: patient._id,
        firstname: patient.firstname,
        lastname: patient.lastname,
        gender: patient.gender,
        genotype: patient.genotype,
        address: patient.address,
        email: patient.email,
        isAdmin: patient.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('Patient not found')
    }
  })
  
  // @desc    Update patient profile
  // @route   PUT /api/patients/profile
  // @access  Private
  const updatePatientProfile = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.patient._id)
  
    if (patient) {
      patient.firstname = req.body.firstname || patient.firstname
      patient.lastname = req.body.lastname || patient.lastname
      patient.email = req.body.email || patient.email
      patient.gender = req.body.gender || patient.gender
      patient.age = req.body.age || patient.age
      patient.allergies = req.body.allergies || patient.allergies
      patient.note = req.body.note || patient.note
      patient.profile = req.body.profile || patient.profile
      patient.healthRecords = req.body.healthRecords || patient.healthRecords
      patient.genotype = req.body.genotype || patient.genotype


      if (req.body.password) {
        patient.password = req.body.password
      }
  
      const updatedPatient = await patient.save()
  
      res.json({
        _id: updatedPatient._id,
        firstname: updatedPatient.firstname,
        lastname: updatedPatient.lastname,
        gender: updatedPatient.gender,
        genotype: updatedPatient.genotype,
        age: updatedPatient.age,
        allergies: updatedPatient.allergies,
        note: updatedPatient.note,
        profile: updatedPatient.profile,
        healthRecords: updatedPatient.healthRecords,
        isAdmin: updatedPatient.isAdmin,
        token: generateToken(updatedPatient._id),
      })
    } else {
      res.status(404)
      throw new Error('Patient not found')
    }
  })
  
  // @desc    Get all patients
  // @route   GET /api/patients
  // @access  Private/Admin
  const getPatients = asyncHandler(async (req, res) => {
    const patients = await Patient.find({})
    res.json(patients)
  })
  
  // @desc    Delete patient
  // @route   DELETE /api/patients/:id
  // @access  Private/Admin
  const deletePatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id)
  
    if (patient) {
      await patient.remove()
      res.json({ message: 'Patient removed' })
    } else {
      res.status(404)
      throw new Error('Patient not found')
    }
  })
  
  // @desc    Get user by ID
  // @route   GET /api/users/:id
  // @access  Private/Admin
  const getPatientById = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id).select('-password')
  
    if (patient) {
      res.json(patient)
    } else {
      res.status(404)
      throw new Error('Patient not found')
    }
  })
  
  // @desc    Update patient
  // @route   PUT /api/patients/:id
  // @access  Private/Admin
  const updatePatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findById(req.params.id)
  
    if (user) {
        patient.firstname = req.body.firstname || patient.firstname
        patient.lastname = req.body.lastname || patient.lastname
        patient.email = req.body.email || patient.email
        patient.gender = req.body.gender || patient.gender
        patient.age = req.body.age || patient.age
        patient.allergies = req.body.allergies || patient.allergies
        patient.note = req.body.note || patient.note
        patient.profile = req.body.profile || patient.profile
        patient.healthRecords = req.body.healthRecords || patient.healthRecords
        patient.genotype = req.body.genotype || patient.genotype
        patient.isAdmin = req.body.isAdmin
  
      const updatedPatient = await patient.save()
  
      res.json({
        _id: updatedPatient._id,
        firstname: updatedPatient.firstname,
        lastname: updatedPatient.lastname,
        gender: updatedPatient.gender,
        genotype: updatedPatient.genotype,
        age: updatedPatient.age,
        allergies: updatedPatient.allergies,
        note: updatedPatient.note,
        profile: updatedPatient.profile,
        healthRecords: updatedPatient.healthRecords,
        isAdmin: updatedPatient.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('Patient not found')
    }
  })
  
  export {
    authPatient,
    registerPatient,
    getPatientProfile,
    updatePatientProfile,
    getPatients,
    deletePatient,
    getPatientById,
    updatePatient,
  }
