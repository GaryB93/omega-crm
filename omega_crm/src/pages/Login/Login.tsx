import './Login.css';
import './LoginErrMsg';
import { useState } from 'react';
import LoginErrMsg from './LoginErrMsg';

function Login() {

  const [loginFailed, setLoginFailed] = useState(false);

  return (
      <form className='loginForm'>
        <h1>Omega CRM</h1>
        {loginFailed && <LoginErrMsg/>}
        <div className='inputContainer'>
          <label id='username' htmlFor='username'>Username</label>
          <input type='text' name='username' required></input>
        </div>
        <div className='inputContainer'>
          <label id='password' htmlFor='password'>Password</label>
          <input type='password' name='password' required></input>
        </div>
        <button type='submit'>Login</button>
      </form>
  )
}

export default Login;