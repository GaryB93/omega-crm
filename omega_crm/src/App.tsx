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

  const [ user, setUser ] = useState({id: 0, firstname: "test", lastname: "", phone: "", schedule: 0, role: ""});

  return (
    <Routes>
      <Route path="/" element={<Login setUser={setUser}/>}/>
      
      <Route element={<ProtectedRoutes isLoggedIn={user.id != 0}/>} >
        <Route element={<DashboardLayout user={user} setUser={setUser}/>} >
          <Route path="schedule" element={<Schedule />} />
          <Route path="customers" element={<Customers />} />
          <Route path="acctmgmt" element={<AcctMgmt />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App;
