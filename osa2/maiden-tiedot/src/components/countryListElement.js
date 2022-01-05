const CountryListElement = ({country}) => {
   return (            
      <li>
         {country.name.common}
      </li>
   );
}

export default CountryListElement;