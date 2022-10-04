const { countBy } = require('lodash/collection')

const dummy = (arr) => {
  return 1
}

const totalLikes = (posts) => {
  if (posts) {
    return posts.reduce( (prev, curr) => prev + curr.likes, 0)
  }
  return 0
}

const favoriteBlog = (posts) => {
  if (posts) {
    const max = posts.reduce( (prev, curr) => prev.likes > curr.likes ? prev : curr, 0 )
    return {
      title: max.title,
      author: max.author,
      likes: max.likes
    }
  }
  return 0
}

const mostBlogs = (posts) => {
  const counted = countBy(posts, 'author')
  const res = Object.entries(counted).sort( (a, b) => b[1]-a[1] )[0]
  return {
    author: res[0],
    blogs: res[1]
  }
}

const mostLikes = (posts) => {
  if (posts) {
    const uniqAuthors = {}
    posts.forEach(post => {
      if (!(post.author in uniqAuthors)) {
        uniqAuthors[post.author] = post.likes
      }
      else {
        uniqAuthors[post.author] += post.likes
      }
    })
    const res = Object.entries(uniqAuthors).sort( (a, b) => b[1]-a[1] )[0]
    return {
      author: res[0],
      likes: res[1]
    }
  }
  return 0
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }