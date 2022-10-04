const User = require('../models/user')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, id: 1 })
  response.status(200).json(users)
})

usersRouter.post('/login', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)
  if (!passwordCorrect) {
    return response.status(400).json({
      error: 'Invalid user or password'
    })
  }

  const userForToken = {
    username,
    id: user.id
  }
  const token = jwt.sign(userForToken, config.SECRET)
  response.status(200).json({
    token,
    username: user.username,
    name: user.name
  })
})

usersRouter.post('/auth', async (request, response) => {
  const { username, name, password } = request.body

  const userExist = await User.findOne({ username })
  if (userExist) {
    return response.status(400).json({
      error: 'User with given username already exist'
    })
  }

  //pass validate
  if (password.length < 3) {
    return response.status(400).json({
      error: 'Password password length must be more then 3 chars'
    })
  }

  const salt = 10
  const passHash = await bcrypt.hash(password, salt)
  const newUser = new User({ username, name, password: passHash })
  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
