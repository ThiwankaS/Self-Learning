const LoginForm = (props) => (
    <form onSubmit={props.handleSubmit}>
      <h3>Login</h3>
        <div>
          Username : <input 
                        type="text"
                        value={props.username}
                        name="Username"
                        onChange={props.handleUsernameChange}
                      />
        </div>
        <div>
          Password : <input 
                        type="text"
                        value={props.password}
                        name="Password"
                        onChange={props.handlePasswordChange}
                      />
        </div> 
      <button type='submit'>Login</button>        
    </form>
)

export default LoginForm