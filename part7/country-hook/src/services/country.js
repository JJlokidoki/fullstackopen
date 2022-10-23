import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1'

const getAll = async () => {
  const res = await axios.get(baseUrl + '/all')
  return res.data
}

const getCountry = async (name) => {
  const res = await axios.get(baseUrl + `/name/${name}?fullText=true`)
  return res.data
}

const countryService = { getAll, getCountry }
export default countryService