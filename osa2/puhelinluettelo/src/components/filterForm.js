const FilterForm = ({filterInput, setFilterInput}) => {
   return (
      <form>
         <div>
            filter persons with: <input value={filterInput} onChange={(event) => setFilterInput(event.target.value)} />
         </div>
    </form>
   )
}

export default FilterForm;