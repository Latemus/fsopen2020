const PersonListElement = ({person, removePerson}) => {
   const {name, number, id} = person;

   return (            
      <li>
         {name} {number} <button onClick={() => removePerson(person)} >delete</button>
      </li>
   );
}

export default PersonListElement;