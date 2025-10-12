import './Login.css';
import './LoginErrMsg';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import LoginErrMsg from './LoginErrMsg';
import userAPI from '../../api/userAPI';
import User from '../../classes/User';

// This component serves as an industry-appropriate security feature and requires the user to login to access the application.

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

function Login({ setIsLoggedIn, setUser }: LoginProps) {
  const navigate = useNavigate();

  const [loginFailed, setLoginFailed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    userAPI.login(username, password)
      .then(response => response.json())
      .then(result => {
        if (result.message) {
          setLoginFailed(true);
        } else {
          setIsLoggedIn(true);
          setUser(result);
          navigate("/schedule");
        }
      })
      .catch(err => console.error('Error:', err));
  }

  return (
    <div id="loginContainer">
      <form className='loginForm' onSubmit={handleSubmit}>
        <h1>Omega CRM</h1>
        {loginFailed && <LoginErrMsg/>}
        <div className='inputContainer'>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' name="username" value={username}
            onChange={(e) => {setUsername(e.target.value)}} required />
        </div>
        <div className='inputContainer'>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name="password" value={password}
            onChange={(e) => {setPassword(e.target.value)}} required />
        </div>
        <button className="primaryBtn" type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login;