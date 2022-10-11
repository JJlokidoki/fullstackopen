const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const { MONGO_URL, NODE_ENV } = require('./utils/config')

const app = express()

mongoose.connect(MONGO_URL)
  .then( () => {
    console.log('Mongodb connected')
  })
  .catch( () => {
    console.log('Mongodb connection failed')
  })

// app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
if (NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
