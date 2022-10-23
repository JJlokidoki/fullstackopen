import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import usersService from '../services/users'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUnit(state, action) {
      return action.payload
    },
    clearUnit() {
      return initialState
    }
  }
})

export const loginBy = (username, password) => {
  return async dispatch => {
    const login = await usersService.login(username, password)
    dispatch(setUnit(login))
    window.localStorage.setItem('user', JSON.stringify(login))
    blogService.setToken(login.token)
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch(clearUnit())
    window.localStorage.clear()
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const userStorage = window.localStorage.getItem('user')
    const loggedIn = JSON.parse(userStorage)
    if (loggedIn) {
      dispatch(setUnit(loggedIn))
      blogService.setToken(loggedIn.token)
    }
  }
}

export const { clearUnit, setUnit } = userSlice.actions
export default userSlice.reducer