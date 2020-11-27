import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


const patientSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    height:{
        type: Number, 
        required: true 
    },
    weight: {
        type: Number, 
        required: true 
    },
    address: {
        type: String, 
        required: true 
    },
    contactInfo: {
        type: String, 
        required: true 
    },
  
    genotype: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

patientSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

patientSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }
    
    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, salt)
})


const Patient = mongoose.model('Patient', patientSchema)

export default Patient