import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import personService from './services/personService'
import InputForm from './components/inputForm'
import StatusMessage from './components/statusMessage'
import PhonebookList from './components/phonebookList'
import FilterForm from './components/filterForm'



const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filterInput, setFilterInput ] = useState('')
  const [ statusMsg, setStatusMsg ] = useState({ isError: null, msg: '' })

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
      .then(person => {
        setPersons(persons.concat(person))
        setSuccessMsg(`Person ${person.name} added succesfully`)
      })
      .catch(error => {
        setErrorMsg(`Error: couldn\'t add person named ${newPerson.name}. ${error.response.data.error}`)
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
        setSuccessMsg(`Person ${person.name} updated succesfully`)
      })
      .catch(error => {
        setErrorMsg(`Error: couldn\'t update person named ${newPerson.name}. ${error}`)
      })
  }

  const removePerson = (person) => {
    if(!confirmAction('remove', person.name)) return
    personService.remove(person.id)
      .then(response => {
        setPersons(persons.filter(p => p.id != person.id))
        setSuccessMsg(`Person ${person.name} removed succesfully`)
      })
      .catch(error => {
        if (error?.response?.status === 404) {
          setErrorMsg(`Error: person ${person.name} allready removed from the server.`)
          setPersons(persons.filter(p => p.id != person.id))
        } else {
          setErrorMsg(`Error: couldn\'t remove person named ${person.name}. ${error}`)
        }
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

  const setSuccessMsg = msg => {
    setStatusMsg({ isError: false , msg })
    setTimeout(() => setStatusMsg({ isError: false, msg: '' }), 5000)
  }

  const setErrorMsg = msg => {
    setStatusMsg({ isError: true, msg })
    setTimeout(() => setStatusMsg({ isError: false, msg: '' }), 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm filterInput={filterInput} setFilterInput={setFilterInput} />
      <InputForm addHandler={addOrUpdatePerson} />
      <StatusMessage statusMessage={statusMsg} />
      <PhonebookList persons={persons} removePerson={removePerson} filterInput={filterInput} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))