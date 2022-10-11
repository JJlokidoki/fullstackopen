import axios from 'axios'
const apiUsers = '/api/users'


const login = async (username, password) => {
  const res = await axios.post(apiUsers + '/login', { username, password } )
  return res.data
}

const auth = async (username, name, password) => {
  await axios.post(apiUsers + '/auth', { username, name, password } )
}

const usersService = { login, auth }
export default usersService