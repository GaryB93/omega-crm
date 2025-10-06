import type { User } from "../pages/AcctMgmt/UserInfo/UserInfo";

function removeUser (users: Array<User>, removedUser: User) {
  const clonedUsers: Array<User> = JSON.parse(JSON.stringify(users));
  return clonedUsers.filter(user => user.id != removedUser.id);
}

export default removeUser;