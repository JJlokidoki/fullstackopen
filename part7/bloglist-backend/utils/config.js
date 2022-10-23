require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://fwd:6p8OfUowpiIdJ1qG@cluster0.3cd4rut.mongodb.net/?retryWrites=true&w=majority'
const SECRET = process.env.SECRET || 'sekret'
const NODE_ENV = process.env.NODE_ENV

module.exports = {
  PORT,
  MONGO_URL,
  SECRET,
  NODE_ENV
}