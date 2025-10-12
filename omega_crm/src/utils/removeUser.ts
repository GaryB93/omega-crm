import User from "../classes/User";

function removeUser (users: Array<User>, removedUser: User) {
  const clonedUsers: Array<User> = JSON.parse(JSON.stringify(users));
  return clonedUsers.filter(user => user.id != removedUser.id);
}

export default removeUser;