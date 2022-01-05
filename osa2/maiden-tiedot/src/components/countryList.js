import CountryInfoBox from "./countryInfoBox";
import CountryListElement from "./countryListElement";

const CountryList = ({ countries, filterInput, selectCountryToShow }) => {

   const tooManyMatches = countries.length > 10;
   const noCountryMatches = filterInput.length > 0 && countries.length === 0;
   const showCountriesNamesList = countries.length > 1 && !tooManyMatches && !noCountryMatches

   return (
      <div>
         <h3>Results:</h3>
         <ul>
            {showCountriesNamesList && 
               countries.map(country => 
                  <CountryListElement country={country} selectCountryToShow={selectCountryToShow} key={country.name.common} />
               )
            }
            {tooManyMatches && 
               <div>
                  Too many matches, specify another filter.
               </div>
            }
            {noCountryMatches &&
               <div>
                  No matches found. Try another filter.
               </div>
            }

         </ul>
         <div>
            {countries.length === 1 &&
               <CountryInfoBox country={countries[0]} />
            }
         </div>
      </div>
   )
}

export default CountryList;