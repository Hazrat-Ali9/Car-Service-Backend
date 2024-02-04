const router = require('express').Router()
const Appointment = require('../model/Appointment')


router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find()
        res.status(200).json(appointments)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
        res.status(200).json(appointment)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})
router.get('/get/:email', async (req, res) => {
    try {
        const appointment = await Appointment.find({ email: req.params.email })
        res.status(200).json(appointment)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})
router.post('/', async (req, res) => {
    const newAppointment = new Appointment(req.body)
    try {
        const appointment = await newAppointment.save()
        res.status(200).json(appointment)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})
router.put('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(appointment)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id)
        res.status(200).json(appointment)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})

module.exports = router