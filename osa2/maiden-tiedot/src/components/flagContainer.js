const FlagContainer = ({svgUrl}) => {

   const flagStyle = {
      width: '150px',
      border: '2px black solid'
   }

   return (
      <div>
         <img src={svgUrl} style={flagStyle} />
      </div>
   )
}

export default FlagContainer