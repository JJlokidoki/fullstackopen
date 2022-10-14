import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async (data) => {
  const res = await axios.post(baseUrl, data)
  return res.data
}

const voteFor = async (data) => {
  const res = await axios.put(baseUrl + `/${data.id}`, data)
  return res.data
}

const anecdotesService = { getAll, createNew, voteFor }
export default anecdotesService