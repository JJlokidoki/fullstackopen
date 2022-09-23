import { useState, useEffect } from 'react'
import Notification from './components/Notification'
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
  const [errorMsg, setErrorMsg] = useState({msg: null, success: null})

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
      try {
        await notes.createNew(newNameObject)
        setPersons(persons.concat(newNameObject))
        setErrorMsg({msg: "Added " + newName, success: true})
        setTimeout( () => setErrorMsg({msg: null, success: null}), 5000)
      }
      catch (error) {
        console.log("Addition " + newName + " was failed");
        setErrorMsg({msg: "Addition " + newName + " was failed", success: false})
        setTimeout( () => setErrorMsg({msg: null, success: null}), 5000)
      }
    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) ) {
        try {
          const response = await notes.updateNote(person.id, {...newNameObject, id: person.id })
          setPersons( persons.map( p => p.id !== person.id ? p : response.data) )
          setErrorMsg({msg: "Number was updated for " + newName, success: true})
          setTimeout( () => setErrorMsg({msg: null, success: null}), 5000)
        }
        catch {
          console.log("Number updated for " + newName + " was failed");
          setErrorMsg({msg: "Number updated for " + newName + " was failed", success: false})
          setTimeout( () => setErrorMsg({msg: null, success: null}), 5000)
        }
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

  // onClick event handlers 
  const onClickDelete = (to_del, name) => async () => {
    if (window.confirm(`Delete ${name} ?`)) {
        try {
            await notes.deleteNote(to_del)
            setErrorMsg({msg: "Information of " + name + " was succefuly removed from server", success: true})
            setPersons(persons.filter( person => person.id !== to_del))   
            setTimeout( () => setErrorMsg({msg: null, success: null}), 5000)
        }
        catch {
            setErrorMsg({msg: "Information of " + name + " has already been removed from server", success: false})
            console.log("Information of " + name + " has already been removed from server");
            setTimeout( () => setErrorMsg({msg: null, success: null}), 5000)
        }
    }
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

      <Notification errorMsg={errorMsg}/>
      <Filter value={search} onChange={onChangeSearch}/>

      <h2> add a new </h2>
      
      <PersonForm onSubmit={addName} nameInput={{newName, onChangeName}} numberInput={{newNumber, onChangeNumber}}/>

      <h2>Numbers</h2>
      
      <Persons 
        onClickDelete={onClickDelete} 
        persons={persons.filter( person => person.name.toLowerCase().includes(search.toLowerCase()) )}
      />
      
    </div>
  )
}

export default App;