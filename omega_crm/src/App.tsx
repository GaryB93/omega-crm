import { useState } from 'react';
import './App.css';
import Login from './pages/Login/Login';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Login/>
    </>
  )
}

export default App;
