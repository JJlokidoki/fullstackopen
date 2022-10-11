const Notification = ({ errorMsg: { msg, success } }) => {
  if (msg === null) {
    return null
  }
  if (success) {
    return(
      <div className="success">
        {msg}
      </div>
    )
  }
  return (
    <div className="error">
      {msg}
    </div>
  )
}

export default Notification