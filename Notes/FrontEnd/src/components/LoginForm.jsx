import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  buttonLable,
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <div>
          Username : <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password : <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id='login-button' type='submit'>{buttonLable}</button>
      </form>
    </div>
  )}

LoginForm.propTypes = {
  username : PropTypes.string.isRequired,
  password : PropTypes.string.isRequired,
  buttonLable : PropTypes.string.isRequired,
  handleSubmit : PropTypes.func.isRequired,
  handleUsernameChange : PropTypes.func.isRequired,
  handlePasswordChange : PropTypes.func.isRequired
}

export default LoginForm