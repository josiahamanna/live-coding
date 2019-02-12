const PORT = process.env.PORT || 8060
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/live-coding'
module.exports = {
    PORT, DB_URL
}