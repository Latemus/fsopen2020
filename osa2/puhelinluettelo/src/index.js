import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import personService from './services/personService'
import InputForm from './components/inputForm'
import PhonebookList from './components/phonebookList'
import FilterForm from './components/filterForm'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filterInput, setFilterInput ] = useState('')
  
  useEffect(() => {
    personService.getAll().then(persons => setPersons(persons))
  }, [])

  const addOrUpdatePerson = (newPerson, clearInputForms) => {
    const personFoundWithId = findPersonByName(newPerson.name);
    if (personFoundWithId) {
      updatePerson(personFoundWithId.id, newPerson)
    } else {
      addPerson(newPerson)
    }
    clearInputForms()
  }

  const addPerson = newPerson => {
    if (!validatePerson(newPerson)) {
      alert(`Name and phone number are required for person`)
      return
    } 
    personService.add(newPerson)
      .then(person => setPersons(persons.concat(person)))
      .catch(error => {
        alert(`Error: couldn\'t add person named ${newPerson.name}`, error)
      })
  }

  const updatePerson = (id, newPerson) => {
    if(!confirmAction('update', newPerson.name)) {
      return
    }
    personService.update(id, newPerson)
      .then(person => {
        const updatedPersons = persons.filter(p => p.id != person.id)
        setPersons(updatedPersons.concat(person))
      })
      .catch(error => {
        alert(`Error: couldn\'t update person named ${newPerson.name}`, error)
      })
  }

  const removePerson = (person) => {
    if(!confirmAction('remove', person.name)) return

    personService.remove(person.id)
      .then(result => setPersons(persons.filter(p => p.id != person.id)))
      .catch(error => {
        alert(`Error: couldn\'t remove person named ${person.name}`, error)
      })
  }

  const findPersonByName = (name) => {
    return persons.find(person => person.name === name);
  }

  const validatePerson = newPerson => {
    return newPerson?.name?.length > 0 && newPerson?.number?.length > 0
  }

  const confirmAction = (action, target) => {
    return window.confirm(`Are you sure you want to ${action} person ${target}?`);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filterInput={filterInput} setFilterInput={setFilterInput} />
      <InputForm addHandler={addOrUpdatePerson} />
      <PhonebookList persons={persons} removePerson={removePerson} filterInput={filterInput} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))