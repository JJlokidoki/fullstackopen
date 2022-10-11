import axios from 'axios'
const apiBlogs = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = 'Baerer ' + newToken
}

const getAll = () => {
  const request = axios.get(apiBlogs)
  return request.then(response => response.data)
}

const create = async (title, author, url) => {
  const res = await axios.post(apiBlogs, { title, author, url }, {
    headers: {
      Authorization: token
    }
  })
  return res.data
}

const setLike = async ({ id, ...data }) => {
  data.likes += 1
  data.user = data.user.id
  await axios.put(apiBlogs + `/${id}`, data, {
    headers: {
      Authorization: token
    }
  })
  return
}

const deleteBlog = async ({ id }) => {
  await axios.delete(apiBlogs + `/${id}`, {
    headers: {
      Authorization: token
    }
  })
  return
}

const blogService = { getAll, create, setToken, setLike, deleteBlog }
export default blogService