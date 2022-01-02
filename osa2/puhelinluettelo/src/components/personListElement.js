const PersonListElement = ({person}) => {
   const {name, number} = person;

   return (            
      <li>
         {name} {number}
      </li>
   );
}

export default PersonListElement;