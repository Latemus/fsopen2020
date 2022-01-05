import FlagContainer from "./flagContainer"


const CountryInfoBox = ({country}) => {
   console.log(country)
   const {name, capital, population, languages, flags} = country
   console.log(name, capital, population, languages, flags)

   const languageList = Object.values(languages).map(language => (
      <li key={name?.common + '_lang_' + language}>
         {language}
      </li>
   ))

   return (
      <div>
         <h3>{name.common} - ({name.official})</h3>
         <div>capital: {capital}</div>
         <div>population: {population}</div>
         <h4>languages:</h4>
         <ul>
            {languageList}
         </ul>
         <FlagContainer svgUrl={flags?.svg} />
      </div>
   )
}

export default CountryInfoBox 