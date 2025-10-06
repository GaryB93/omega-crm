import { useState, type SetStateAction } from "react";
import type { User } from "../pages/AcctMgmt/UserInfo/UserInfo";
import { useSchedules } from "../reducers/scheduleReducer";
import userAPI from "../api/userAPI";
import updateUsers from "../utils/updateUsers";

interface UserInfoModalProps {
  selectedUser: User;
  resetSelectedUser: ()=>void;
  setUsers: React.Dispatch<SetStateAction<Array<User>>>;
  users: Array<User>;
  closeUserInfoModal: ()=>void;
}

function UserInfoModal ({selectedUser, resetSelectedUser, users, setUsers, closeUserInfoModal}: UserInfoModalProps) {
  const [formState, setFormState] = useState({
    id: selectedUser.id,
    firstname: selectedUser.firstname,
    lastname: selectedUser.lastname,
    phone: selectedUser.phone,
    schedule: selectedUser.schedule,
    role: selectedUser.role,
    username: "",
    password: "",
    confirmPassword: ""
  })

  const schedules = useSchedules().schedules;
  const scheduleOptions = schedules.map(schedule => {
    return (
      <option key={schedule.id} value={schedule.id}>
        {schedule.name}
      </option>
    );
  });
  scheduleOptions.unshift(<option key={0} value={0} selected disabled hidden>Choose schedule...</option>)

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if (selectedUser.id == 0) {
      userAPI.addUser(formState)
      .then(result => {
        setUsers(updateUsers(users, result));
        closeUserInfoModal();
      })
      .catch(err => console.error('Error:', err));
    } else {
      userAPI.saveUser(formState)
      .then(result => {
        resetSelectedUser();
        setUsers(updateUsers(users, result));
        closeUserInfoModal();
      })
      .catch(err => console.error('Error:', err));
    }
  }

  return (
    <form className="formModal" onSubmit={handleSubmit}>
      <h3>User Info</h3>
      <div>
        <label htmlFor="firstname">First Name:</label>
        <input type="text" id="firstname" value={formState.firstname} onChange={(e)=>setFormState({...formState, firstname: e.target.value})}/>
      </div>

      <div>
        <label htmlFor="lastname">Last Name:</label>
        <input type="text" id="lastname" value={formState.lastname} onChange={(e)=>setFormState({...formState, lastname: e.target.value})}/>
      </div>

      <div>
        <label htmlFor="phone">Phone Number:</label>
        <input type="text" id="phone" value={formState.phone} onChange={(e)=>setFormState({...formState, phone: e.target.value})}/>
      </div>

      <div>
        <label htmlFor="schedule">Schedule:</label>
        <select id="schedule" value={formState.schedule} onChange={(e)=>setFormState({...formState, schedule: Number(e.target.value)})}>
          {scheduleOptions}
        </select>
      </div>

      <fieldset>
        <legend>Role:</legend>
        <input type="radio" id="userRole" value="user" checked={formState.role === "user"}
          onChange={(e)=>setFormState({...formState, role: e.target.value})}/>
        <label htmlFor="userRole">User</label>

        <input type="radio" id="salesRole" value="sales" checked={formState.role === "sales"}
          onChange={(e)=>setFormState({...formState, role: e.target.value})}/>
        <label htmlFor="salesRole">Sales</label>

        <input type="radio" id="managerRole" value="manager" checked={formState.role === "manager"}
          onChange={(e)=>setFormState({...formState, role: e.target.value})}/>
        <label htmlFor="managerRole">Manager</label>
      </fieldset>

      {selectedUser.id == 0 && <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={formState.username} onChange={(e)=>setFormState({...formState, username: e.target.value})}/>
      </div>}

      {selectedUser.id == 0 && <div>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" value={formState.password} onChange={(e)=>setFormState({...formState, password: e.target.value})}/>
      </div>}

      <button type="submit">Save</button>
    </form>
  )
}

export default UserInfoModal;