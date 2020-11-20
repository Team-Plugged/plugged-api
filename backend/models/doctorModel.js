import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const doctorSchema = mongoose.Schema({
    hospital: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profile: {
        address: { type: String, required: true},
        city: { type: String, required: true},
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


doctorSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

doctorSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }
    
    const salt = await bcrypt.genSalt(10)

    this.password = await bcrypt.hash(this.password, salt)
})


const Doctor = mongoose.model('Doctor', doctorSchema)

export default Doctor