import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Patient from '../models/patientModel.js'
import Hospital from '../models/hospitalModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            
            req.patient = await Patient.findById(decoded.id).select('-password')

            req.hospital = await Hospital.findById(decoded.id).select('-password')

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

const hospitalVerified = (req, res, next) => {
    if(req.hospital && req.hospital.isVerified) {
        next()
    } else {
        res.status(401)
        throw new Error('Not yet Verified')
    }
}

const hospitalAdmin = (req, res, next) => {
    if(req.hospital && req.hospital.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

export { protect, patientAdmin, hospitalAdmin, hospitalVerified }