import type { User } from "../pages/AcctMgmt/UserInfo/UserInfo";

function updateUsers (users: Array<User>, userToAddOrSave: User) {
  const clonedUsers = JSON.parse(JSON.stringify(users));
  const index = users.findIndex(user => user.id == userToAddOrSave.id);

  if (index != -1) {
    clonedUsers[index] = userToAddOrSave;
  } else {
    clonedUsers.unshift(userToAddOrSave);
  }

  return clonedUsers;
}

export default updateUsers;