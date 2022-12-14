const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/user')


const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  // console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'BadRequest') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('baerer ')) {
    request.token = authorization.substring(7)
  }
  else {
    request.token = null
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedJWT = jwt.verify(request.token, config.SECRET)

  if (!decodedJWT.id) {
    return response.status(401).json({
      error: 'Invalid JWT token'
    })
  }
  const user = await User.findById(decodedJWT.id)
  if (!user) {
    return response.status(401).json({
      error: 'Invalid JWT token'
    })
  }
  request.user = user
  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}