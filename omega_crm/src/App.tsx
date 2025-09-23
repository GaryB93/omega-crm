import { useState } from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import Login from './pages/Login/Login';
import DashboardLayout from './pages/Dashboard/Dashboard';
import Schedule from './pages/Schedule/Schedule';
import Customers from './pages/Customers/Customers';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path="login" element={<Login/>} />

      <Route element={<DashboardLayout />} >
        <Route path="schedule" element={<Schedule />} />
        <Route path="customers" element={<Customers />} />
        {/* <Route path="acctmgmt" element={<AccountManagement />} /> */}
      </Route>
    </Routes>
  )
}

export default App;
