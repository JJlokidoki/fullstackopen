import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload.toLowerCase()
    },
    clearFilter(state, action) {
      return ''
    },
  }
})

export const { clearFilter, setFilter} = filter.actions
export default filter.reducer