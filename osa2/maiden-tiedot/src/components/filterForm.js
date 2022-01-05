const FilterForm = ({filterInput, setFilterInput}) => {
   return (
      <form>
         <div>
            find countries: <input value={filterInput} onChange={(event) => setFilterInput(event.target.value)} />
         </div>
    </form>
   )
}

export default FilterForm;