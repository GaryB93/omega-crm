import { NavLink } from "react-router";
import type { User } from "../../../interfaces/User";
import './Nav.css';

interface NavProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

function Nav ({ user, setUser }: NavProps) {

  const handleClick = () => {
    setUser({id: 0, firstname: "", lastname: "", phone: "", schedule: 0, role: ""});
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
        <div id="logoutSection">
          <span>User: {user.firstname}</span>
          <button className="secondaryBtn" onClick={handleClick}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Nav;