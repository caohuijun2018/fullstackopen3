
const NotificationErr = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  const NotificationSucc = ({message}) => {
    if (message === null) {
      return null;
    }
      return (
        <div className = 'successful'>{message}</div>
      )
   
    
  };
export default {
    NotificationErr,NotificationSucc
}