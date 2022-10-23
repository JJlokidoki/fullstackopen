import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ""
    }
  }
})

export const setNotificationOn = (msg, timeout) => {
  return async dispatch => {
    window.clearTimeout(window.timeout)
    dispatch(setNotification(msg))
    window.timeout = setTimeout( () => dispatch(clearNotification()), timeout * 1000)
  }
}

export const { clearNotification, setNotification } = notificationSlice.actions
export default notificationSlice.reducer