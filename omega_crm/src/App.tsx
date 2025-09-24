import { useState } from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import Login from './pages/Login/Login';
import DashboardLayout from './pages/Dashboard/Dashboard';
import Schedule from './pages/Schedule/Schedule';
import Customers from './pages/Customers/Customers';
import AcctMgmt from './pages/AcctMgmt/AcctMgmt';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn}/>} >
        <Route element={<DashboardLayout setIsLoggedIn={setIsLoggedIn}/>} >
          <Route path="schedule" element={<Schedule />} />
          <Route path="customers" element={<Customers />} />
          <Route path="acctmgmt" element={<AcctMgmt />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App;
