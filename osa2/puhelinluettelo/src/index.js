import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import InputForm from './components/inputForm'
import PhonebookList from './components/phonebookList'
import FilterForm from './components/filterForm'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ filterInput, setFilterInput ] = useState('')
  
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