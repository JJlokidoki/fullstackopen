/* eslint-disable linebreak-style */
import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import usersService from './services/users'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState({ msg: null, success: null })
  // const [sortDesc, setSortDesc] = useState(false)

  const blogFormRef = useRef()

  // const sortBlogs = () => {
  //   const sortedBlogs = [...blogs]
  //   if (sortDesc) {
  //     sortedBlogs.sort( (a, b) => b.likes - a.likes)
  //     setBlogs(sortedBlogs)
  //     setSortDesc(false)
  //   }
  //   else {
  //     sortedBlogs.sort( (a, b) => a.likes - b.likes)
  //     setBlogs(sortedBlogs)
  //     setSortDesc(true)
  //   }
  // }

  useEffect( () => {
    async function fetchData() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const userStorage = window.localStorage.getItem('user')
    const loggedIn = JSON.parse(userStorage)
    if (loggedIn) {
      setUser(loggedIn)
      blogService.setToken(loggedIn.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const login = await usersService.login(username, password)
      setUser(login)
      window.localStorage.setItem('user', JSON.stringify(login))
      blogService.setToken(login.token)
      setUsername('')
      setPassword('')
    }
    catch (error) {
      setErrorMsg({ msg: error.response.data.error, success: false })
      setTimeout( () => setErrorMsg({ msg: null, success: null }), 5000)
    }
  }

  const handleLogoutClick = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const handleLikeClick = (blog) => async () => {
    try {
      await blogService.setLike(blog)
      let targetBlog = blogs.find( b => b.id === blog.id )
      targetBlog.likes += 1
      setBlogs(blogs.map( b => b.id !== blog.id ? b : targetBlog))
    }
    catch (error) {
      setErrorMsg({ msg: error.response.data.error, success: false })
      setTimeout( () => setErrorMsg({ msg: null, success: null }), 5000)
    }
  }

  const handleDeleteClick = (blog) => async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        await blogService.deleteBlog(blog)
        setBlogs(blogs.filter( b => b.id !== blog.id ))
        setErrorMsg({ msg: `Blog ${blog.title} by ${blog.author} was deleted`, success: true })
        setTimeout( () => setErrorMsg({ msg: null, success: null }), 5000)
      }
      catch (error) {
        setErrorMsg({ msg: error.response.data.error, success: false })
        setTimeout( () => setErrorMsg({ msg: null, success: null }), 5000)
      }
    }
  }


  return (
    <div>
      {user === null
        ? // if user
        <LoginForm
          errorMsg={errorMsg}
          username={username}
          password={password}
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
        : // else
        <div>
          <h2>blogs</h2>
          <Notification errorMsg={ errorMsg }/>
          <div>
            {user.username} logged in
            <button onClick={handleLogoutClick}>logout</button>
            <Togglable buttonLabel='create blog' ref={blogFormRef}>
              <BlogForm
                setErrorMsg={ setErrorMsg }
                blogsProps={{ blogs, setBlogs }}
                blogFormRef={blogFormRef}
              />
            </Togglable>
            {/* { sortDesc
            ? <button onClick={sortBlogs}> Desc </button>
            : <button onClick={sortBlogs}> Asc </button>
          } */}
            {blogs
              .sort( (a, b) => b.likes - a.likes )
              .map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleLikeClick={handleLikeClick(blog)}
                  handleDeleteClick={handleDeleteClick(blog)}
                />)
            }
          </div>
        </div>
      }
    </div>
  )
}

export default App
