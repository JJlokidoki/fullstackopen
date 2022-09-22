import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Result from './components/Result'

function App() {
  // State hooks
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  // onChange event handler
  const onChangeFilter = (event) => {
    setFilter(event.target.value)
  }

  // onClick event handler
  const onClickCountry = (countryName) => () => {
    setFilter(countryName)
  }

  // Effect hook
  useEffect( () => {
    async function fetchData() {
      console.log('Start fetching')
      const response = await axios.get('https://restcountries.com/v3.1/all')
      setCountries(response.data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <Filter onChange={onChangeFilter} value={filter}/>
      <Result 
        countries={
          countries.filter( (country) => {
            return country.name.common.toLowerCase().includes(filter.toLowerCase())
          })}
          onClick={onClickCountry}
      />
    </div>
  );
}

export default App;
