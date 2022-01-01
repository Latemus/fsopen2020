import PersonListElement from "./personListElement";

const PhonebookList = ({ persons, filterInput }) => {
   
   const filterMatches = (person) => {
      return person.name.toLowerCase().includes(filterInput.toLowerCase()) 
         || person.number.toLowerCase().includes(filterInput.toLowerCase());
   }

   const filteredList = filterInput.trim().length > 0 
      ? persons.filter(person => filterMatches(person))
      : persons;

   return (
      <div>
         <h3>Numbers</h3>
         <ul>
            {filteredList.map(person => 
               <PersonListElement person={person} />
            )}
         </ul>
      </div>
   )
}

export default PhonebookList;