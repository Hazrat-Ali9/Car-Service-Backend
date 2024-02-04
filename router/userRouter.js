const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')
const ignoreFeild = {
    _id: 0,
    __v: 0,
    password: 0
}

router.post('/register', async (req, res) => {
    const { email, password, name } = req.body
    try {
        const isExists = await User.findOne({ email });
        if (isExists) {
            res.status(404).send({ err: "User Already Exists" });
        } else {
            const hasPassord = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password });
            await newUser.save();
            res.send({ message: "User Created Successfully" });
        }
    } catch (error) {
        res.status(500).send({ err: error.message });
    }
})
router.post('/all', async (req, res) => {
    const email = req.body.email
    try {
        const isAdmin = await User.findOne({ email: email, role: "admin" })
        const users = await User.find()
            .select(ignoreFeild)
            .exec()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})
router.get('/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
            .select(ignoreFeild)
            .exec()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})
router.get('/check/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email, role: 'admin' })
        if (user) {
            res.status(200).json({ role: "admin" })
        }
        else {
            res.status(200).json({ role: 'user' })
        }

    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})
router.put('/:email', async (req, res) => {
    
    try {
        const user = await User.updateOne({ email: req.params.email }, req.body)
        res.status(200).json({ message: "User Updated Successfully" })
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "User Deleted Successfully" })
    } catch (error) {
        res.status(500).json({ err: error.message })
    }
})

module.exports = router