import { NavLink } from "react-router";
import './Nav.css';

function Nav ({ setIsLoggedIn }: { setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {

  const handleClick = () => {
    setIsLoggedIn(false);
  }

  return (
    <div id="nav">
      <h1>Omega CRM</h1>
      <div id="container">
        <div id="navLinks">
          <NavLink to="/schedule">Schedule</NavLink>
          <NavLink to="/customers">Customers</NavLink>
          <NavLink to="/acctmgmt">Account Management</NavLink>
        </div>
        <button id="logoutButton" onClick={handleClick}>Logout</button>
      </div>
    </div>
  )
}

export default Nav;