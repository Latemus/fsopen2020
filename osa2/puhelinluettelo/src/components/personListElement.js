const PersonListElement = ({person}) => {
   const {name, number} = person;
   
   return (            
      <li key={name}>
         {name} {number}
      </li>
   );
}

export default PersonListElement;