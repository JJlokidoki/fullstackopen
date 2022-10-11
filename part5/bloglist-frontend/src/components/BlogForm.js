import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({
  setErrorMsg,
  blogsProps: { blogs, setBlogs },
  blogFormRef
}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreation = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create(title, author, url)
      setErrorMsg({ msg: `a new blog ${title} by ${author} added` , success: true })
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisible()
    }
    catch (error) {
      setErrorMsg({ msg: error.response.data.error, success: false })
      setTimeout( () => setErrorMsg({ msg: null, success: null }), 5000)
    }
  }

  return(
    <div className='blogForm'>
      <h2>Create new</h2>
      <form onSubmit={handleCreation}>
        <div>
          title
          <input
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id='title'
          />
        </div>
        <div>
          author
          <input
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id='author'
          />
        </div>
        <div>
          url
          <input
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id='url'
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  setErrorMsg: PropTypes.func.isRequired,
  blogsProps: PropTypes.object.isRequired,
}

export default BlogForm