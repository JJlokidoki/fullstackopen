const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./blogs_helper')
const app = require('../app')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const api = supertest(app)

beforeEach( async () => {
  await Blog.deleteMany({})
  const blogs = helper.initial_blogs.map( i => new Blog(i))
  const promises = blogs.map( b => b.save())
  await Promise.all(promises)
})

describe('/api/blogs', () => {
  let token
  let userId
  beforeAll( async () => {
    await User.deleteMany({})
    const user = await new User({
      ...helper.initial_users[0],
      password: await bcrypt.hash('test', 10)
    }).save()
    userId = user.id
    token = jwt.sign({ username: user.username, id: user.id }, config.SECRET)
    return token, userId
  })

  test('get blogs', async () => {
    const result = await api.get('/api/blogs')
      .expect('Content-Type', /application\/json/)
      .expect(200)
    expect(result.body).toHaveLength(helper.initial_blogs.length)
  })

  test('unique id', async () => {
    const result = await api.get('/api/blogs')
    expect(result.body[0].id).toBeDefined()
  })

  test('saving blog', async () => {
    const newBlog = {
      'title': 'nowhere',
      'author': 'Nil geyman',
      'url': 'http://nil.gey',
      'likes': 6
    }
    await api.post('/api/blogs')
      .set('Authorization', `Baerer ${token}`)
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
      .expect(201)

    const all = await helper.blogsInDB()
    expect(all).toHaveLength(helper.initial_blogs.length + 1)
  })

  test('default likes is 0', async () => {
    const newBlog = {
      'title': 'nowhere',
      'author': 'Nil geyman',
      'url': 'http://nil.gey'
    }

    const result = await api.post('/api/blogs')
      .set('Authorization', `Baerer ${token}`)
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
      .expect(201)

    expect(result.body.likes).toBe(0)

    const all = await helper.blogsInDB()
    expect(all).toHaveLength(helper.initial_blogs.length + 1)
  })

  test('missing url', async () => {
    const newBlog = {
      'title': 'nowhere',
      'author': 'Nil geyman',
      'likes': 0
    }
    const result = await api.post('/api/blogs')
      .set('Authorization', `Baerer ${token}`)
      .send(newBlog)
      .expect('content-type', /application\/json/)
      .expect(400)

    expect(result.body.error).toBeDefined()
  })

  test('missing title', async () => {
    const newBlog = {
      'author': 'Nil geyman',
      'url': 'http://nil.gey',
      'likes': 0
    }
    const result = await api.post('/api/blogs')
      .set('Authorization', `Baerer ${token}`)
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
      .expect(400)

    expect(result.body.error).toBeDefined()
  })

  test('deleting blog', async () => {
    const newBlog = {
      'title': 'nowhere',
      'author': 'Nil geyman',
      'url': 'http://nil.gey',
      'likes': 6,
      'user': userId
    }
    const blogToDel = await new Blog(newBlog).save()

    await api.delete(`/api/blogs/${blogToDel.id}`)
      .set('Authorization', `Baerer ${token}`)
      .expect(204)
    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initial_blogs.length)
    const titles = blogsAtEnd.map( blog => blog.title)
    expect(titles).not.toContain(newBlog.title)
  })

  test('delete blog without token', async () => {
    const newBlog = {
      'title': 'nowhere',
      'author': 'Nil geyman',
      'url': 'http://nil.gey'
    }
    const blog = new Blog(newBlog)
    const blogToDel = await blog.save()

    const res = await api.delete(`/api/blogs/${blogToDel.id}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initial_blogs.length + 1)
    expect(res.error).toBeDefined()
  })

  test('post blog without token', async () => {
    const newBlog = {
      'title': 'nowhere',
      'author': 'Nil geyman',
      'url': 'http://nil.gey',
      'likes': 6
    }
    const res = await api.post('/api/blogs')
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
      .expect(401)

    const all = await helper.blogsInDB()
    expect(all).toHaveLength(helper.initial_blogs.length)
    expect(res.error).toBeDefined()
  })
})

describe('/users', () => {
  beforeEach( async () => {
    await User.deleteMany({})
  })
  test('auth', async () => {
    const newUser = {
      username: 'McKaley',
      name: 'Alone',
      password: 'robbers'
    }
    const dbInStart = await helper.usersInDB()
    const res = await api.post('/api/users/auth')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(res.body.name).toBe(newUser.name)
    const dbInEnd = await helper.usersInDB()
    expect(dbInEnd).toHaveLength(dbInStart.length + 1)
  })

  test('get users', async () => {
    const res = await api.get('/api/users')
      .expect(200)

    expect(res.body).toHaveLength(0)
  })

  test('invalid username',  async () => {
    const newUser = {
      username: 'Mc',
      name: 'Alone',
      password: 'robbers'
    }

    const dbInStart = await helper.usersInDB()
    const res = await api.post('/api/users/auth')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toBeDefined()
    const dbInEnd = await helper.usersInDB()
    expect(dbInEnd).toHaveLength(dbInStart.length)

  })

  test('invalid password',  async () => {
    const newUser = {
      username: 'McKaley',
      name: 'Alone',
      password: 'ro'
    }

    const dbInStart = await helper.usersInDB()
    const res = await api.post('/api/users/auth')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toBeDefined()
    const dbInEnd = await helper.usersInDB()
    expect(dbInEnd).toHaveLength(dbInStart.length)
  })

  test('unique username', async () => {
    const newUser = {
      username: 'McKaley',
      name: 'Alone',
      password: 'robbers'
    }
    const passHash = await bcrypt.hash('test', 10)
    await new User({ ...newUser, password: passHash }).save()

    const dbInStart = await helper.usersInDB()
    const res = await api.post('/api/users/auth')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(res.body.error).toBeDefined()
    const dbInEnd = await helper.usersInDB()
    expect(dbInEnd).toHaveLength(dbInStart.length)
  })

  test('get token aka login', async () => {
    const newUser = {
      username: 'McKaley',
      name: 'Alone',
      password: 'robbers'
    }
    await new User({
      ...newUser,
      password: await bcrypt.hash(newUser.password, 10)
    }).save()
    const res = await api.post('/api/users/login')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body.username).toBe(newUser.username)
    expect(res.body.name).toBe(newUser.name)
    expect(res.body.token).toBeDefined()
  })
})


afterAll(() => {
  mongoose.connection.close()
})