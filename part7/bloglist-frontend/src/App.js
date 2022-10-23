/* eslint-disable linebreak-style */
import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationOn } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, loginBy } from './reducers/userReducer'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import Blog from './components/Blog'
import Header from './components/Header'
import { Heading } from '@chakra-ui/react'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect( () => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginBy(username, password))
      setUsername('')
      setPassword('')
    }
    catch (error) {
      dispatch(setNotificationOn({ msg: error.response.data.error, success: false }, 5))
    }
  }

  return (
    <div>
      {user === null
        ? // if user
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
        : // else
        <Router>
          <div>
            <Header username={user.username}/>
            <Heading size='lg'>blogs</Heading>
            <Notification/>
            <div>
              <Routes>
                <Route path='/' element={ <Blogs /> } />
                <Route path='/users' element={ <Users /> } />
                <Route path='/users/:id' element={ <UserBlogs /> } />
                <Route path='/blogs/:id' element={ <Blog /> } />
              </Routes>
            </div>
          </div>
        </Router>
      }
    </div>
  )
}

export default App
