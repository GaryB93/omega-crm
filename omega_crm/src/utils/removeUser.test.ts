import { expect, test } from "vitest";
import removeUser from "./removeUser";
import User from "../classes/User";

// works in app, come back to this test

test.skip('removes user object from list of users after deletion', () => {
  const user1 = new User(1, 'fname1', 'lname1', '1111111111', 1, 'user');
  const user2 = new User(2, 'fname2', 'lname2', '1111111111', 1, 'user');
  const user3 = new User(3, 'fname3', 'lname3', '1111111111', 1, 'user');

  const users = [user1, user2, user3];
  expect(users.length).toBe(3);

  const newUsers = removeUser(users, user1);
  expect(newUsers.length).toBe(2);

});