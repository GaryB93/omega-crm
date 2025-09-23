import { NavLink } from "react-router";
import './Nav.css';

function Nav () {
  return (
    <div id="nav">
      <h1>Omega CRM</h1>
      <div id="container">
        <div id="navLinks">
          <NavLink to="/schedule">Schedule</NavLink>
          <NavLink to="/customers">Customers</NavLink>
          <NavLink to="/acctmgmt">Account Mangaement</NavLink>
        </div>
        <button id="logoutButton">Logout</button>
      </div>
    </div>
  )
}

export default Nav;