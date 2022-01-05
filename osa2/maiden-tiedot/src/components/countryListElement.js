const CountryListElement = ({country, selectCountryToShow}) => {

   return (            
      <li>
         <span>{country.name.common} </span>
         <button onClick={() => selectCountryToShow(country.name.common)}>show</button>
      </li>
   );
}

export default CountryListElement;