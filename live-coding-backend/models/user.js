const mongoose = require('moongoose')
const { Schema } = mongoose.Schema

const bcrypt = require('bcryptjs')

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

userSchema.pre('save', function (next) {
    if (this.isNew) {
        bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(this.password, salt))
            .then(hashedPassword => {
                this.password = hashedPassword
                next()
            })
            .catch(err => console.log(err))
    } else {
        next()
    }
})

const User = mongoose.model('users', userSchema)

module.exports = {
    User
}