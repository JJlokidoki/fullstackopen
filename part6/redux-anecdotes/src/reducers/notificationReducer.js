import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notification.actions

export const setNotificationOn = (msg, timeout) => {
  return async dispatch => {
    window.clearTimeout(window.timeout)
    dispatch(setNotification(msg))
    window.timeout = setTimeout( () => dispatch(clearNotification()), timeout * 1000)
  }
}

export default notification.reducer