import './Login.css';
import './LoginErrMsg';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import LoginErrMsg from './LoginErrMsg';

function Login() {
  const navigate = useNavigate();

  const [loginFailed, setLoginFailed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/schedule");
  }

  return (
    <div id="loginContainer">
      <form className='loginForm' onSubmit={handleSubmit}>
        <h1>Omega CRM</h1>
        {loginFailed && <LoginErrMsg/>}
        <div className='inputContainer'>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username'  value={username} 
            onChange={(e) => {setUsername(e.target.value)}} />
        </div>
        <div className='inputContainer'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password'  value={password}
            onChange={(e) => {setPassword(e.target.value)}} />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login;