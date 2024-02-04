const router = require('express').Router()
const Service = require('../model/Service')


router.get('/', async (req, res) => {
    try {
        const services = await Service.find()
        res.status(200).json(services)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
        res.status(200).json(service)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})
router.post('/', async (req, res) => {
    const newService = new Service(req.body)
    try {
        const service = await newService.save()
        res.status(200).json(service)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(service)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id)
        res.status(200).json(service)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})


module.exports = router