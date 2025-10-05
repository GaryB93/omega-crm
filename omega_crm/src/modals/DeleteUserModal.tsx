import type { User } from "../pages/AcctMgmt/UserInfo/UserInfo";
import userAPI from "../api/userAPI";

interface DeleteUserModalProps {
  selectedUser: User;
  resetSelectedUser: ()=>void;
}

function DeleteUserModal ({selectedUser, resetSelectedUser}: DeleteUserModalProps) {
  
  const handleClick = () => {
    userAPI.deleteUser(selectedUser.id)
    .then(result => {
      console.log(result);
      resetSelectedUser();
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