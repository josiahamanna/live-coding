const express = require('express')
const router = express.Router()

const { User } = require('../models/user')

const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../config/config')

router.post('/register', (req, res) => {
    const newUser = new User(req.body)
    newUser.save()
        .then(() => {
            res.send({ notice: 'User registered successfully' })
        })
        .catch((err) => {
            res.send({ error: err })
        })
})

router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // call a static user defined function on user model
    User.matchUserCredentials(email, password)
        .then(user => {
            // Create a payload for jwt
            const payload = {
                id: user.id, name: user.name, role: user.email
            }
            // Generate a token which expires in 5 hours
            jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '5h' }, (err, token) => {
                res.send({
                    success: 'logged in successfully',
                    // create a bearer token which will be used by passport to authenticate
                    token: 'Bearer ' + token
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(400).send({ error: err })
        })
})

module.exports = {
    userRouter: router
}