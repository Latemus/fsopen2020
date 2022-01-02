import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import InputForm from './components/inputForm'
import PhonebookList from './components/phonebookList'
import FilterForm from './components/filterForm'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filterInput, setFilterInput ] = useState('')
  
  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const addPerson = (newPerson, clearInputForms) => {
    if (personExistsAllready(newPerson)) {
      alert(`${newPerson.name} is already added to phonebook`)
      return;
    }
    setPersons(persons.concat(newPerson));
    clearInputForms();
  }

  const personExistsAllready = (newPerson) => {
    return persons.find(person => person.name === newPerson.name || person.number === newPerson.number);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filterInput={filterInput} setFilterInput={setFilterInput} />
      <InputForm addHandler={addPerson} />
      <PhonebookList persons={persons} filterInput={filterInput} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))