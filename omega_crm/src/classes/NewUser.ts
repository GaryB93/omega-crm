import User from "./User";

export interface NewUserInterface {
  id: number;
  firstname: string;
  lastname: string;
  phone: string;
  schedule: number;
  role: string;
  username: string;
  password: string;
  confirmPassword: string;
}

class NewUser extends User {
  #confirmPassword: string;

  constructor({ 
    id, 
    firstname, 
    lastname, 
    phone, 
    schedule, 
    role, 
    username, 
    password, 
    confirmPassword
  }: NewUserInterface) {
    super(id, firstname, lastname, phone, schedule, role, username, password);
    this.#confirmPassword = confirmPassword;
  }

  set confirmPassword (confirmPassword) {
    this.#confirmPassword = confirmPassword;
  }

  get confirmPassword () {
    return this.#confirmPassword;
  }

  passwordsMatch () {
    return this.password == this.#confirmPassword;
  }

  displayInfo () {
    console.log(`id: ${this.id}\n
                 firstname: ${this.firstname}\n
                 lastname: ${this.lastname}\n
                 schedule: ${this.schedule}\n
                 phone: ${this.phone}\n
                 role: ${this.role}\n
                 username: ${this.username}\n
                 password: ${this.password}\n
                 confirmPassword: ${this.#confirmPassword}`);
  }
}

export default NewUser;