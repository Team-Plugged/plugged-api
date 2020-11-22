import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Hospital from '../models/hospitalModel.js'

// @desc    Auth hospital & get token
// @route   POST /api/hospitals/login
// @access  Public
const authHospital = asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    const hospital = await Hospital.findOne({ email })
  
    if (hospital && (await hospital.matchPassword(password)) && hospital.isVerified) {
      res.json({
        _id: hospital._id,
        hospital: hospital.hospital,
        email: hospital.email,
        address: hospital.address,
        isAdmin: hospital.isAdmin,
        isVerified: hospital.isVerified,
        token: generateToken(hospital._id),
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password or not verified')
    }
  })
  
  // @desc    Register a new hospital
  // @route   POST /api/hospitals
  // @access  Public
  const registerHospital = asyncHandler(async (req, res) => {
    const { 
        hospital, 
        email, 
        address,
        password } = req.body
  
    const hospitalExists = await Hospital.findOne({ email })
  
    if (hospitalExists) {
      res.status(400)
      throw new Error('Hospital already exists')
    }
  
    const newHospital = await Hospital.create({
        hospital, 
        email, 
        address,
        password,
    })
  
    if (newHospital) {
      res.status(201).json({
        _id: newHospital._id,
        hospital: newHospital.hospital,
        email: newHospital.email,
        address: newHospital.address,
        isAdmin: newHospital.isAdmin,
        isVerified: newHospital.isVerified,
        token: generateToken(newHospital._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid hospital data')
    }
  })
  
  // @desc    Get hospitals profile
  // @route   GET /api/hospitals/profile
  // @access  Private
  const getHospitalProfile = asyncHandler(async (req, res) => {
    const hospital = await Hospital.findById(req.hospital._id)
  
    if (hospital) {
      res.json({
        _id: hospital._id,
        hospital: hospital.hospital,
        email: hospital.email,
        address: hospital.address,
        isAdmin: hospital.isAdmin,
        isVerified: hospital.isVerified,
      })
    } else {
      res.status(404)
      throw new Error('Hospital not found')
    }
  })
  
  // @desc    Update hospital profile
  // @route   PUT /api/hospitals/profile
  // @access  Private
  const updateHospitalProfile = asyncHandler(async (req, res) => {
    const hospital = await Hospital.findById(req.hospital._id)
  
    if (hospital) {
      hospital.hospital = req.body.hospital || hospital.hospital
      hospital.email = req.body.email || hospital.email
      hospital.address = req.body.address || hospital.address
    
      if (req.body.password) {
        hospital.password = req.body.password
      }
  
      const updatedHospital = await hospital.save()
  
      res.json({
        _id: updatedHospital._id,
        hospital: updatedHospital.hospital,
        email: updatedHospital.email,
        address: updatedHospital.address,
        isAdmin: updatedHospital.isAdmin,
        isVerified: updatedHospital.isVerified,
        token: generateToken(updatedHospital._id),
      })
    } else {
      res.status(404)
      throw new Error('Hospital not Found')
    }
  })
  
  // @desc    Get all hospitals
  // @route   GET /api/hospitals
  // @access  Private/Admin
  const getHospitals = asyncHandler(async (req, res) => {
    const hospitals = await Hospital.find({})
    res.json(hospitals)
  })
  
  // @desc    Delete hospital
  // @route   DELETE /api/hospitals/:id
  // @access  Private/Admin
  const deleteHospital = asyncHandler(async (req, res) => {
    const hospital = await Hospital.findById(req.params.id)
  
    if (hospital) {
      await hospital.remove()
      res.json({ message: 'Hospital removed' })
    } else {
      res.status(404)
      throw new Error('Hospital not found')
    }
  })
  
  // @desc    Get hospital by ID
  // @route   GET /api/hospitals/:id
  // @access  Private/Admin
  const getHospitalById = asyncHandler(async (req, res) => {
    const hospital = await Hospital.findById(req.params.id).select('-password')
  
    if (hospital) {
      res.json(hospital)
    } else {
      res.status(404)
      throw new Error('Hospital not found')
    }
  })
  
  // @desc    Update hospital
  // @route   PUT /api/hospitals/:id
  // @access  Private/Admin
  const updateHospital = asyncHandler(async (req, res) => {
    const hospital = await Hospital.findById(req.params.id)
  
    if (hospital) {
        hospital.hospital = req.body.hospital || hospital.hospital
        hospital.email = req.body.email || hospital.email
        hospital.address = req.body.address || hospital.address
        hospital.isAdmin = req.body.isAdmin
        hospital.isVerified = req.body.isVerified
  
      const updatedHospital = await hospital.save()
  
      res.json({
        _id: updatedHospital._id,
        hospital: updatedHospital.hospital,
        email: updatedHospital.email,
        address: updatedHospital.address,
        isAdmin: updatedHospital.isAdmin,
        isVerified: updatedHospital.isVerified,
      })
    } else {
      res.status(404)
      throw new Error('Hospital not found')
    }
  })
  
  export {
    authHospital,
    registerHospital,
    getHospitalProfile,
    updateHospitalProfile,
    getHospitals,
    deleteHospital,
    getHospitalById,
    updateHospital,
  }
