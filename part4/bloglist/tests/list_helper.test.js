const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')

test('dummy', () => {
  const res = dummy([])
  expect(res).toBe(1)
})

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    blogs: [],
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    blogs: [],
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    blogs: [],
    __v: 0
  },
]

describe('totalLikes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const res = totalLikes([blogs[0]])
    expect(res).toBe(7)
  })

  test('of empty list is zero', () => {
    const res = totalLikes([])
    expect(res).toBe(0)
  })

  test('of a bigger list is calculated right', () => {
    const res = totalLikes(blogs)
    expect(res).toBe(24)
  })
})

describe('favoriteBlog', () => {
  const favBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12,
  }

  test('clac fav blog', () => {
    const res = favoriteBlog(blogs)
    expect(res).toEqual(favBlog)
  })
})

describe('mostBlogs', () => {
  test('calc most blogs', () => {
    const res = mostBlogs(blogs)
    expect(res).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    })
  })
})

describe('mostLikes', () => {
  test('calc most likes', () => {
    const res = mostLikes(blogs)
    expect(res).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})