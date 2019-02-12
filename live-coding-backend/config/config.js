const PORT = process.env.PORT || 8060
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/live-coding'
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret@123#'

module.exports = {
    PORT, DB_URL, JWT_SECRET_KEY
}