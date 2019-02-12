const mongoose = require('moongoose')
const { Schema } = mongoose.Schema

mongoose.Pormise = global.Promise

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'moderator'],
        required: true,
        default: 'user'
    }
})

const User = mongoose.model('users', userSchema)

module.exports = {
    User
}