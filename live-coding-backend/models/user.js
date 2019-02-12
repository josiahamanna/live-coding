const mongoose = require('mongoose')
const { Schema } = mongoose

const bcrypt = require('bcryptjs')

mongoose.Promise = global.Promise


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
            .then(salt => {
                return bcrypt.hash(this.password, salt)
            })
            .then(hashedPassword => {
                this.password = hashedPassword
                next()
            })
            .catch(err => console.log(err))
    } else {
        next()
    }
})

userSchema.methods.matchUserCredentials = function (email, password) {
    // Get the reference of the userSchema. It is not necessary. Instead of using 'this' we will use User
    const User = this
    return User.findOne({ email })
        .then(user => {
            // if user exits
            if (user) {
                return bcrypt.compare(password, user.password)
                    .then(isMatched => {
                        // If password is correct resolve the promise
                        if (isMatched) {
                            return Promise.resolve(user)
                        }
                        // if password is incorrect reject the promise
                        else {
                            return Promise.reject('invalid email or password')
                        }
                    })
            }
        })
        // if email is not found
        .catch(err => {
            return Promise.reject(err)
        })
}

const User = mongoose.model('users', userSchema)

module.exports = {
    User
}