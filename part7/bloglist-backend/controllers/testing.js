const blog = require('../models/blog')
const user = require('../models/user')

const testingRouter = require('express').Router()

testingRouter.post('/reset', async (request, response) => {
  await blog.deleteMany({})
  await user.deleteMany({})
  response.status(204).end()
})

module.exports = testingRouter