import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotes"
import { setNotificationOn } from "./notificationReducer"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    incrementVote(state, action) {
      return state.map( a => a.id !== action.payload ? a : {...a, votes: a.votes + 1})
    },
    createNew(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const initializeAnecdotes = () => {
  return async dispatch => {
    const ancs = await anecdotesService.getAll()
    dispatch(setAnecdotes(ancs))
  } 
}

export const createNewAnecdote = (data) => {
  return async dispatch => {
    const res = await anecdotesService.createNew(data)
    dispatch(createNew(res))
  } 
}

export const incrementVoteFor = (data) => {
  return async dispatch => {
    const res = await anecdotesService.voteFor({ ...data, votes: data.votes + 1 })
    dispatch(incrementVote(res.id))
    dispatch(setNotificationOn('Success voting', 5))
  }
}

export const { createNew, incrementVote, setAnecdotes } = anecdoteReducer.actions
export default anecdoteReducer.reducer