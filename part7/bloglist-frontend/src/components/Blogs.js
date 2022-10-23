import { useSelector } from 'react-redux'
// import Blog from './Blog'
// import { likeBlog, deleteBlog } from '../reducers/blogReducer'
// import { setNotificationOn } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const Blogs = () => {
  // const dispatch = useDispatch()
  const blogs = useSelector(store => store.blogs)

  const blogFormRef = useRef()

  // const handleLikeClick = (blog) => async () => {
  //   try {
  //     dispatch(likeBlog(blog))
  //   }
  //   catch (error) {
  //     dispatch(setNotificationOn({ msg: error.response.data.error, success: false }, 5))
  //   }
  // }

  // const handleDeleteClick = (blog) => async () => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
  //     try {
  //       dispatch(deleteBlog(blog))
  //     }
  //     catch (error) {
  //       dispatch(setNotificationOn({ msg: error.response.data.error, success: false }, 5))
  //     }
  //   }
  // }

  if ( !blogs.length ) {
    return(
      <div>
        No one blogs yet
      </div>
    )
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const sortedBlogs = [...blogs].sort( (a, b) => b.likes - a.likes )
  return(
    <div>
      <Togglable buttonLabel='create blog' ref={blogFormRef}>
        <BlogForm
          blogFormRef={blogFormRef}
        />
      </Togglable>
      {sortedBlogs
        .map(blog =>
          <div key={blog.id} style={blogStyle}>
            <Link to={`blogs/${blog.id}`}> {blog.title} </Link>
            {/* // blog={blog}
              // handleLikeClick={handleLikeClick(blog)}
              // handleDeleteClick={handleDeleteClick(blog)} */}
          </div>
        )
      }
    </div>
  )
}

export default Blogs