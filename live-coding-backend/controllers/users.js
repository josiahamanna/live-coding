const express = require('express')
const router = express.Router()

const { User } = require('../models/user')

router.post('/register', (req, res) => {
    const newUser = new User(req.body)
    newUser.save()
    then(() => {
        res.send({ notice: 'User registered successfully' })
    })
        .catch((err) => {
            res.send({ error: error })
        })
})

module.exports = {
    userRouter: router
}