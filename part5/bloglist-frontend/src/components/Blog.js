import { useState } from 'react'

const Blog = ({ blog, handleLikeClick, handleDeleteClick }) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  return(
    <div style={blogStyle} className='blog'>
      { !visible
        ? <div className='collapsed'>
          {blog.title} {blog.author}
          <button onClick={toggleVisible}>view</button>
        </div>
        : <div className='expanded'>
          <div className='title'>
            {blog.title} <button onClick={toggleVisible}>hide</button>
          </div>
          <div>
            {blog.url}
          </div>
          <div className='likes'>
            {blog.likes}
            <button onClick={handleLikeClick}>like</button>
          </div>
          <div className='author'>
            {blog.author}
          </div>
          <button onClick={handleDeleteClick}>remove</button>
        </div>
      }
    </div>
  )
}

export default Blog