import Person from "./Person";

// This code includes inheritance, polymorphism, and encapsulation in the following ways:
// Inheritance - This class inherits properties from the Person class.
// Polymorphism - This class defines its own displayInfo() method to replace the displayInfo() method from the Person class to display additional properties in the User class.
// Encapsulation - All properties in the created classes, including this User class, are private properties and can only be accessed using the getter and setter functions.

class User extends Person {
  #id: number = 0;
  #schedule: number;
  #role: string;
  #username: string;
  #password: string;

  constructor(id: number, firstname: string, lastname: string, phone: string, schedule: number, role: string, username: string = "", password: string = "") {
    super(firstname, lastname, phone);
    this.#id = id;
    this.#schedule = schedule;
    this.#role = role;
    this.#username = username;
    this.#password = password;
  }

  get id () {
    return this.#id;
  }

  set id (id: number) {
    this.#id = id;
  }

  get schedule () {
    return this.#schedule;
  }

  set schedule (schedule: number) {
    this.#schedule = schedule;
  }

  get role () {
    return this.#role;
  }

  set role (role: string) {
    this.#role = role;
  }

  get username () {
    return this.#username;
  }

  set username (username: string) {
    this.#username = username;
  }

  get password () {
    return this.#password;
  }

  set password (password: string) {
    this.#password = password;
  }

  displayInfo() {
    console.log(`id: ${this.#id}\n
                 firstname: ${this.firstname}\n
                 lastname: ${this.lastname}\n
                 schedule: ${this.#schedule}\n
                 phone: ${this.phone}\n
                 role: ${this.#role}\n
                 username: ${this.#username}\n
                 password: ${this.#password}`);
  }
}

export default User;