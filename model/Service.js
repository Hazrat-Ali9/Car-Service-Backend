const mongoose = require('mongoose')
// service 
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true })
const Service = mongoose.model('Service', serviceSchema)
module.exports = Service