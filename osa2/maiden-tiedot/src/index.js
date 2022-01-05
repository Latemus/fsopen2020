import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import CountryList from './components/countryList'
import FilterForm from './components/filterForm'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filterInput, setFilterInput ] = useState('')
  const [ abortController, setAbortController ] = useState(null)

  useEffect(() => {
    if (filterInput.length == 0) {
      return
    }
    // Cancel earlier request so that the list is not updated with data from older request that is received after a later request
    abortController?.abort()
    // Create new AbortController for this request so that it can be aborted if new request is sent before this one is finished
    const controller = new AbortController()
    axios
      .get(`https://restcountries.com/v3.1/name/${filterInput}`, {
        signal: controller.signal
      })
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      })
      .catch(() => {
        setCountries([])
      });
    setAbortController(controller)

  }, [filterInput])

  const selectCountryToShow = (countryName) => {
    let filteredList = countries.filter(country => country.name.common === countryName)
    setCountries(filteredList)
  }

  return (
    <div>
      <h2>Country info search tool</h2>
      <FilterForm filterInput={filterInput} setFilterInput={setFilterInput} />
      <CountryList countries={countries} filterInput={filterInput} selectCountryToShow={selectCountryToShow} />
    </div>
  )

}

ReactDOM.render(<App />, document.getElementById('root'))