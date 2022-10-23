import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotificationOn } from './notificationReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    clearBlogs() {
      return initialState
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    incrementLike(state, action) {
      return state.map( a => a.id !== action.payload ? a : { ...a, likes: a.likes + 1 })
    },
    deleteUnit(state, action) {
      return state.filter( a => a.id !== action.payload )
    },
    addComment(state, action) {
      return state.map( blog => blog.id !== action.payload.id
        ? blog
        : { ...blog, comments: blog.comments.concat(action.payload.comment) } )
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const res = await blogService.getAll()
    dispatch(setBlogs(res))
  }
}

export const addNewBlog = (title, author, url) => {
  return async dispatch => {
    const newBlog = await blogService.create(title, author, url)
    dispatch(addBlog(newBlog))
    dispatch(setNotificationOn({ msg: `a new blog ${title} by ${author} added`, success: true }, 5))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.setLike(blog)
    dispatch(incrementLike(blog.id))
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch(deleteUnit(blog.id))
    dispatch(setNotificationOn({ msg: `Blog ${blog.title} by ${blog.author} was deleted`, success: true }, 5))
  }
}

export const addNewComment = (id, comment) => {
  return async dispatch => {
    await blogService.addComment(id, comment)
    dispatch(addComment({ id, comment }))
    dispatch(setNotificationOn({ msg: 'Comment added!', success: true }, 5))
  }
}

export const { clearBlogs, setBlogs, addBlog, incrementLike, deleteUnit, addComment } = blogSlice.actions
export default blogSlice.reducer