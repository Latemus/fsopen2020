import React, { useState, useEffect } from 'react'
import FlagContainer from "./flagContainer"
import axios from 'axios'


const CountryInfoBox = ({country}) => {

   const [ weatherData, setWeatherData ] = useState(null)
   const {name, capital, capitalInfo, population, languages, flags, coatOfArms} = country

   const languageList = Object.values(languages).map(language => (
      <li key={name?.common + '_lang_' + language}>
         {language}
      </li>
   ))

   function numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

   useEffect(() => {
      // http://www.7timer.info/doc.php?lang=en
      axios
         .get(`http://www.7timer.info/bin/api.pl?lat=${capitalInfo.latlng[0]}&lon=${capitalInfo.latlng[1]}&product=civillight&output=json&unit=metric`)
         .then(response => {
         console.log(response.data.dataseries)
         setWeatherData(response.data.dataseries)
         })
         .catch((error) => {
            console.log("Error fetching weather data", error)
            setWeatherData([])
         });
   }, [])

   return (
      <div>
         <h3>{name.common} - ({name.official})</h3>
         <div>capital: {capital}</div>
         <div>population: {numberWithSpaces(population)}</div>
         <h4>languages:</h4>
         <ul>
            {languageList}
         </ul>
         <FlagContainer svgUrl={flags?.svg} />
         <FlagContainer svgUrl={coatOfArms?.svg} />
         <h4>Weather in {capital}</h4>
         <div>
            {!weatherData && "Fetching weather data for capital"}
            {weatherData && weatherData.length == 0 && "Error fetching weather data"}
            {weatherData && weatherData.length > 0 &&
               <div>
                  <div>date: {weatherData[0].date}</div>
                  <div>temperature: min {weatherData[0].temp2m.min}, max {weatherData[0].temp2m.max}</div>
                  <div>weather: {weatherData[0].weather}</div>
               </div>
            }
         </div>

         <img src={`http://www.7timer.info/bin/astro.php?lat=${capitalInfo.latlng[0]}&lon=${capitalInfo.latlng[1]}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`}></img>
         <div>Weather data provided by: <a href="http://www.7timer.info">http://www.7timer.info</a></div>
      </div>
   )
}

export default CountryInfoBox 