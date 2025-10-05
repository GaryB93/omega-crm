import './AcctMgmt.css';
import userAPI from '../../api/userAPI';
import { useState } from 'react';
import UserInfo from './UserInfo/UserInfo';

function AcctMgmt () {
  const [formState, setFormState] = useState({
    firstname: "",
    lastname: "",
    role: "",
  });

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
        id: 0,
        firstname: "",
        lastname: "",
        phone: "",
        schedule: 0,
        role: ""
      });

  const userList = users.map(user => <UserInfo key={user.id} user={user} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    userAPI.getUsers(formState)
    .then(result => {
      setUsers(result);
    })
    .catch(err => console.error('Error:', err))
  }

  return (
    <div id="accountsContainer">
      <h2>User Search</h2>
      <form id="userSearch" onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" value={formState.firstname}
          onChange={(e)=>setFormState({...formState, firstname: e.target.value})}/>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" value={formState.lastname}
          onChange={(e)=>setFormState({...formState, lastname: e.target.value})}/>

        <fieldset>
          <legend>Roles:</legend>
          <input type="radio" id="user" name="user" value="user" checked={formState.role === "user"}
            onChange={()=>setFormState({...formState, role: "user"})}/>
          <label htmlFor="user">User</label>
          <input type="radio" id="sales" name="sales" value="sales" checked={formState.role === "sales"}
            onChange={()=>setFormState({...formState, role: "sales"})}/>
          <label htmlFor="sales">Sales</label>
          <input type="radio" id="manager" name="manager" value="manager" checked={formState.role === "manager"}
            onChange={()=>setFormState({...formState, role: "manager"})}/>
          <label htmlFor="manager">Manager</label>
        </fieldset>

        <button type="submit">Search</button>
      </form>

      <div id="searchResults">
        <div id="searchResultsHeader">
          <span>First Name</span>
          <span>Last Name</span>
          <span>Phone Number</span>
          <span>Role</span>
          <span>Schedule</span>
        </div>
        {userList}
      </div>
      <div id="userFunctions">
        <button>New User</button>
        <button disabled={selectedUser.id == 0 ? true : false}>Edit</button>
        <button disabled={selectedUser.id == 0 ? true : false}>Delete</button>
      </div>
    </div>
  )
}

export default AcctMgmt;