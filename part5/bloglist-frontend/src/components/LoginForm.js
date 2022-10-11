import Notification from './Notification'

const LoginForm = ({
  errorMsg,
  username,
  password,
  handleSubmit,
  handlePasswordChange,
  handleUsernameChange,
}) => {
  return(
    <div>
      <h2>log in to application</h2>
      <Notification errorMsg = {errorMsg} />
      <form onSubmit = {handleSubmit}>
        <div>
        username
          <input
            type = 'text'
            value = {username}
            onChange = {handleUsernameChange}
            id = 'username'
          />
        </div>
        <div>
        password
          <input
            type = 'text'
            value = {password}
            onChange = {handlePasswordChange}
            id = 'password'
          />
        </div>
        <button type='submit'> Login </button>
      </form>
    </div>
  )
}

export default LoginForm