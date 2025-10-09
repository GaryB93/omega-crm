import type { SetStateAction } from 'react';
import { useSchedules } from '../../../reducers/scheduleReducer';
import './UserInfo.css';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  schedule: number;
  role: string;
}

interface UserInfoProps {
  user: User;
  selectedUser: User;
  setSelectedUser: React.Dispatch<SetStateAction<User>>;
}

function UserInfo ({user, selectedUser, setSelectedUser}: UserInfoProps) {

  const schedules = useSchedules().schedules;

  const handleSelect= () => {
    if (user.id == selectedUser.id) {
      setSelectedUser({
        id: 0,
        firstname: "",
        lastname: "",
        phone: "",
        schedule: 0,
        role: ""
      })
    } else {
      setSelectedUser(user);
    }
  }

  const classes = user.id == selectedUser.id ? "userInfo userSelected" : "userInfo";

  return (
    <div className={classes} onClick={handleSelect}>
      <span>{user.id}</span>
      <span>{user.firstname}</span>
      <span>{user.lastname}</span>
      <span>{user.phone}</span>
      <span>{user.role}</span>
      <span>{schedules.find(schedule => schedule.id == user.schedule).name}</span>
    </div>
  )
}

export default UserInfo;