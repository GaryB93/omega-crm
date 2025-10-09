import './AcctMgmt.css';
import userAPI from '../../api/userAPI';
import { useState } from 'react';
import UserInfo from './UserInfo/UserInfo';
import Modal from '../../components/Modal/Modal';
import UserInfoModal from '../../modals/UserInfoModal';
import DeleteUserModal from '../../modals/DeleteUserModal';

function AcctMgmt () {
  const [formState, setFormState] = useState({
    firstname: "",
    lastname: "",
    role: "all",
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

  const resetSelectedUser = () => {
    setSelectedUser({
      id: 0,
      firstname: "",
      lastname: "",
      phone: "",
      schedule: 0,
      role: ""
    });
  }

  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const openUserInfoModal = () => setIsUserInfoModalOpen(true);
  const closeUserInfoModal = () => setIsUserInfoModalOpen(false);

  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const openDeleteUserModal = () => setIsDeleteUserModalOpen(true);
  const closeDeleteUserModal = () => setIsDeleteUserModalOpen(false);

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
          <input type="radio" id="all" name="role" value="all" checked={formState.role === "all"}
            onChange={()=>setFormState({...formState, role: "all"})}/>
          <label htmlFor="all">All</label>
          <input type="radio" id="user" name="role" value="user" checked={formState.role === "user"}
            onChange={()=>setFormState({...formState, role: "user"})}/>
          <label htmlFor="user">User</label>
          <input type="radio" id="sales" name="role" value="sales" checked={formState.role === "sales"}
            onChange={()=>setFormState({...formState, role: "sales"})}/>
          <label htmlFor="sales">Sales</label>
          <input type="radio" id="manager" name="role" value="manager" checked={formState.role === "manager"}
            onChange={()=>setFormState({...formState, role: "manager"})}/>
          <label htmlFor="manager">Manager</label>
        </fieldset>

        <button type="submit">Search</button>
      </form>

      <div id="searchResults">
        <div id="searchResultsHeader">
          <span>ID</span>
          <span>First Name</span>
          <span>Last Name</span>
          <span>Phone Number</span>
          <span>Role</span>
          <span>Schedule</span>
        </div>
        {userList}
      </div>
      <div id="userFunctions">
        <button onClick={()=> {resetSelectedUser(); openUserInfoModal();}}>New User</button>
        <button disabled={selectedUser.id == 0 ? true : false} onClick={openUserInfoModal}>Edit</button>
        <button disabled={selectedUser.id == 0 ? true : false} onClick={openDeleteUserModal}>Delete</button>
      </div>

      <Modal show={isUserInfoModalOpen} onClose={closeUserInfoModal}>
        <UserInfoModal selectedUser={selectedUser} resetSelectedUser={resetSelectedUser} users={users}
          setUsers={setUsers} closeUserInfoModal={closeUserInfoModal}/>
      </Modal>

      <Modal show={isDeleteUserModalOpen} onClose={closeDeleteUserModal}>
        <DeleteUserModal selectedUser={selectedUser} resetSelectedUser={resetSelectedUser} users={users}
          setUsers={setUsers} closeDeleteUserModal={closeDeleteUserModal}/>
      </Modal>
    </div>
  )
}

export default AcctMgmt;