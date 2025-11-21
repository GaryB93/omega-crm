import { useState, type SetStateAction } from "react";
import { useSchedules } from "../reducers/scheduleReducer";
import userAPI from "../api/userAPI";
import updateUsers from "../utils/updateUsers";
import type { User } from "../interfaces/User";
import ErrMsg from "../components/ErrMsg/ErrMsg";

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
    schedule: selectedUser.schedule == null ? 0 : selectedUser.schedule,
    role: selectedUser.role,
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  // const [scheduleSelected, setScheduleSelected] = useState(true);
  const [roleSelected, setRoleSelected] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [usernameExists, setUsernameExists] = useState(false);

  const schedules = useSchedules().schedules;
  const scheduleOptions = schedules.map(schedule => {
    return (
      <option key={schedule.id} value={schedule.id}>
        {schedule.name}
      </option>
    );
  });
  scheduleOptions.unshift(<option key={0} value={0} disabled hidden>Choose schedule...</option>)

  const formIsValid = () => {
    let formIsValid = true;
  
    if (formState.phone.match(/^[0-9]{10}$/)) {
      setIsPhoneValid(true);
    } else {
      formIsValid = false;
      setIsPhoneValid(false);
    }

    if (formState.role == "") {
      formIsValid = false;
      setRoleSelected(false);
    } else {
      setRoleSelected(true);
    }

    if (formState.password != formState.confirmPassword) {
      formIsValid = false;
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }

    return formIsValid;
  }

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if (formIsValid()) {
      if (selectedUser.id == 0) {
        userAPI.addUser(formState)
        .then(response => response.json())
        .then(result => {
          if (!result.error) {
            setUsers(updateUsers(users, result));
            closeUserInfoModal();
          } else {
            setUsernameExists(true);
          }
        })
        .catch(err => console.error('Error:', err));
      } else {
        userAPI.saveUser(formState)
        .then(response => response.json())
        .then(result => {
          resetSelectedUser();
          setUsers(updateUsers(users, result));
          closeUserInfoModal();
        })
        .catch(err => console.error('Error:', err));
      }
    }
  }

  return (
    <form className="formModal userInfoModal" onSubmit={handleSubmit}>
      <h3>User Info</h3>
      <label htmlFor="firstname">First Name:</label>
      <input type="text" id="firstname" value={formState.firstname} onChange={(e)=>setFormState({...formState, firstname: e.target.value})} required/>
      
      <label htmlFor="lastname">Last Name:</label>
      <input type="text" id="lastname" value={formState.lastname} onChange={(e)=>setFormState({...formState, lastname: e.target.value})} required/>
    
      <label htmlFor="phone">Phone Number:</label>
      <input type="text" id="phone" value={formState.phone} onChange={(e)=>setFormState({...formState, phone: e.target.value})}/>
      {!isPhoneValid && <ErrMsg message='Please input a phone number using ten numbers. No letters, dashes, or spaces.'/>}

      <label htmlFor="schedule">Schedule:</label>
      <select id="schedule" value={formState.schedule} onChange={(e)=>setFormState({...formState, schedule: Number(e.target.value)})}>
        {scheduleOptions}
      </select>
      {/* {!scheduleSelected && <ErrMsg message='Please select a schedule.' />} */}

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
      {!roleSelected && <ErrMsg message='Please select a role.' />}

      {selectedUser.id == 0 && <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={formState.username} onChange={(e)=>setFormState({...formState, username: e.target.value})} required/>
      </div>}

      {usernameExists && <ErrMsg message="Username already exists."/>}

      {selectedUser.id == 0 && <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={formState.password} onChange={(e)=>setFormState({...formState, password: e.target.value})} required/>
      </div>}

      {selectedUser.id == 0 && <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" value={formState.confirmPassword} onChange={(e)=>setFormState({...formState, confirmPassword: e.target.value})} required/>
      </div>}

      {!passwordsMatch && <ErrMsg message='Passwords must match!'/>}

      <button className="primaryBtn submitBtn" type="submit">Save</button>
    </form>
  )
}

export default UserInfoModal;