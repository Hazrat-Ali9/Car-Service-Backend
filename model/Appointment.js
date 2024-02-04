const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    service_id: {
        type: String,
        required: true
    },
    date: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
})

const Appointment = mongoose.model('Appointment', appointmentSchema)
module.exports = Appointment
