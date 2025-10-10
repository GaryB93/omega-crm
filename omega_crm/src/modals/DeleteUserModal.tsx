import User from "../classes/User";
import userAPI from "../api/userAPI";
import removeUser from "../utils/removeUser";
import type { SetStateAction } from "react";

interface DeleteUserModalProps {
  selectedUser: User;
  resetSelectedUser: ()=>void;
  closeDeleteUserModal: ()=>void;
  users: Array<User>;
  setUsers: React.Dispatch<SetStateAction<Array<User>>>;
}

function DeleteUserModal ({selectedUser, resetSelectedUser, closeDeleteUserModal, users, setUsers}: DeleteUserModalProps) {
  
  const handleClick = () => {
    userAPI.deleteUser(selectedUser.id)
    .then(response => response.json())
    .then(result => {
      resetSelectedUser();
      closeDeleteUserModal();
      setUsers(removeUser(users, result));
    })
    .catch(error => console.error('Error:', error));
  }
  
  return(
    <div>
      <h3>Delete User</h3>
      <p>Are you sure you want to delete this user?</p>
      <p>{selectedUser.firstname} {selectedUser.lastname}</p>
      <button onClick={handleClick}>Yes</button>
    </div>
  )
}

export default DeleteUserModal;