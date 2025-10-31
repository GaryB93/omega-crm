import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import userAPI from '../../api/userAPI';
import type { User } from '../../interfaces/User';
import ErrMsg from '../../components/ErrMsg/ErrMsg';

interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

function Login({ setUser }: LoginProps) {
  const navigate = useNavigate();

  const [loginFailed, setLoginFailed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    userAPI.login(username, password)
      .then(async response => {
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        } 
        return response.json();
      })
      .then(result => {
        if (result.message) {
          setLoginFailed(true);
        } else {
          setUser(result);
          navigate("/schedule");
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <div id="loginContainer">
      <form className='loginForm' onSubmit={handleSubmit}>
        <h1>Omega CRM</h1>
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

        {loginFailed && <ErrMsg message ='Incorrect username or password entered. Please try again.'/>}
        
        <button className="primaryBtn" type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login;