import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Patient from '../models/patientModel.js'
import Doctor from '../models/doctorModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            
            req.patient = await Patient.findById(decoded.id).select('-password')

            req.doctor = await Doctor.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, Token Failed')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }

})

const patientAdmin = (req, res, next) => {
    if(req.patient && req.patient.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

const doctorAdmin = (req, res, next) => {
    if(req.doctor && req.doctor.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

export { protect, patientAdmin, doctorAdmin }