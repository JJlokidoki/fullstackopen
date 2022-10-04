require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGO_URL = process.env.MONGO_URL
const SECRET = process.env.SECRET

module.exports = {
  PORT,
  MONGO_URL,
  SECRET,
}