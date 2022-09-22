import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import notes from './service/notes'

const App = () => {
  // States
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  // onSubmit event handler
  const addName = async (event) => {
    event.preventDefault()
    const newNameObject = { 
      name: newName, 
      number: newNumber, 
      id: Math.max(...persons.map( p => p.id)) + 1 
    }
    const person = persons.find( person => person.name === newName)
    if (!person){
      await notes.createNew(newNameObject)
      setPersons(persons.concat(newNameObject))
    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) ) {
        const response = await notes.updateNote(person.id, {...newNameObject, id: person.id })
        setPersons(persons.concat(response.data))
        setPersons( persons.map( p => p.id !== person.id ? p : response.data) )
      }
    }
  }
  
  // onChange event handlers 
  const onChangeName = (event) => {
    setNewName(event.target.value)
  }

  const onChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const onChangeSearch = (event) => {
    setSearch(event.target.value)
  }

  // Effect hook
  useEffect( () => {
    async function fetchData() {
      const response = await notes.getAll()
      setPersons(response.data)
    }
    fetchData()
  }, [])
  console.log('render', persons.length, 'notes')

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter value={search} onChange={onChangeSearch}/>

      <h2> add a new </h2>
      
      <PersonForm onSubmit={addName} nameInput={{newName, onChangeName}} numberInput={{newNumber, onChangeNumber}}/>

      <h2>Numbers</h2>
      
      <Persons persons={persons.filter( person => person.name.toLowerCase().includes(search.toLowerCase()) )}/>
      
    </div>
  )
}

export default App;