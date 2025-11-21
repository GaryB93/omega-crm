import { useSchedules } from '../../../reducers/scheduleReducer';
import type { User } from '../../../interfaces/User';
import './UserInfo.css';
import displayPhone from '../../../utils/displayPhone';

interface UserInfoProps {
  user: User;
  selectedUser: User;
  setSelectedUser: React.Dispatch<React.SetStateAction<User>>;
  resetSelectedUser: ()=>void;
}

function UserInfo ({user, selectedUser, setSelectedUser, resetSelectedUser}: UserInfoProps) {

  const schedules = useSchedules().schedules;

  const handleSelect= () => {
    if (user.id == selectedUser.id) {
      resetSelectedUser();
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
      <span>{displayPhone(user.phone)}</span>
      <span>{user.role}</span>
      <span>{user.schedule != null ? schedules.find(schedule => schedule.id == user.schedule).name : '---'}</span>
    </div>
  )
}

export default UserInfo;