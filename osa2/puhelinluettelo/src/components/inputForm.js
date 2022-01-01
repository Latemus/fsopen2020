import React, { useState } from 'react'

const InputForm = ({ addHandler }) => {

   const [ newName, setNewName ] = useState('');
   const [ newNumber, setNewNumber ] = useState('');

   const addNewPerson = (event) => {
      event.preventDefault();
      const newPerson = {
         name: newName,
         number: newNumber
      };
      addHandler(newPerson, clearInputForms);
   }

   const clearInputForms = () => {
      setNewName('');
      setNewNumber('');
   }

   const updateName = (event) => setNewName(event.target.value);
   const updateNumber = (event) => setNewNumber(event.target.value);

   return (
      <div>
         <h3>Add new person</h3>
         <form>
            <div>
               name: <input value={newName} onChange={updateName} />
            </div>
            <div>
               number: <input value={newNumber} onChange={updateNumber} />
            </div>
            <div>
               <button type="submit" onClick={addNewPerson}>add</button>
            </div>
         </form>
      </div>
   )
}

export default InputForm;