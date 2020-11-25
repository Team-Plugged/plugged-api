import mongoose from 'mongoose'

const healthRecordSchema = mongoose.Schema({
    symptoms: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        required: true,
    },
    prescription: {
        type: String,
        required: true
    },
    allergies: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    patientEmail: {
        type: String,
        required: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Hospital'
    }
}, {
    timestamps: true
})





const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema)

export default HealthRecord