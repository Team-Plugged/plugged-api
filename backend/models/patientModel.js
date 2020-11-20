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
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    allergies: [
        {
            name: { type: String, required: true }
        }
    ],
    note: [
        {
            name: { type: String, required: true }
        }
    ],
    profile: {
        address: { type: String, required: true},
        city: { type: String, required: true},
        height: { type: String, required: true},
        weight: { type: String, required: true},
    },
    healthRecords: [
        {
            date: { type: Date, required: true },
            symptoms: { type: String, required: true },
            diagnosis: { type: String, required: true },
            prescription: { type: Number, required: true },
            doctor: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Doctor'
            }
        }
    ],
    genotype: {
        type: String,
        required: true
    },
    address: {
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