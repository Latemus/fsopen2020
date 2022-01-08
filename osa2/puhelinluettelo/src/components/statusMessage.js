
import './statusMessage.css'

const StatusMessage = ({statusMessage}) => {
   const {isError, msg} = statusMessage
   if (msg === null || msg.length === 0 || isError === null) {
      return null
   }

   const classes = `status-message ${isError ? 'error' : ''}`

   return (
      <div className={classes}>
         {msg}
      </div>
   )
}

export default StatusMessage