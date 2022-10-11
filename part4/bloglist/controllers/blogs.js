const Blog = require('../models/blog')
const blogRouter = require('express').Router()
const middleware = require('../utils/middleware')


blogRouter.get('/', async (request, response) => {
  const res = await Blog.find({}).populate('user', { username: 1, name:1, id: 1 })
  if (!res.length) {
    response.json([])
  }
  response.json(res)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const newBlog = new Blog({ ...request.body, user: user.id })
  if (!newBlog.likes) {
    newBlog.likes = 0
  }
  const res = await newBlog.save()
  user.blogs = user.blogs.concat(res.id)
  await user.save()
  response.status(201).json(res)
})

blogRouter.delete('/:id', middleware.userExtractor, async ( request, response ) => {
  const user = request.user

  const id = request.params.id
  const blogToDel = await Blog.findById(id)
  if (!blogToDel) {
    return response.status(404).json({
      error: 'Unknown blog id'
    })
  }
  if (blogToDel.user.toString() !== user.id) {
    return response.status(403).json({
      error: 'Forbidden access to blogs action'
    })
  }
  await blogToDel.delete()
  return response.status(204).end()
})

blogRouter.put('/:id', middleware.userExtractor, async ( request, response ) => {
  const id = request.params.id
  const newLikes = request.body.likes
  const blogToUpd = await Blog.findById(id)
  if (blogToUpd) {
    await blogToUpd.update({ likes: newLikes }, { new: true, runValidators: true })
    return response.status(201).end()
  }
  return response.status(404).json({
    error: 'Unknown blog id'
  })
})



module.exports = blogRouter