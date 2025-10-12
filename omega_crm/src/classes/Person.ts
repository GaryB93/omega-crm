class Person {
  #firstname = "";
  #lastname = "";
  #phone = "";

  constructor(firstname: string, lastname: string, phone: string = "") {
    this.#firstname = firstname.trim().toUpperCase();
    this.#lastname = lastname.trim().toUpperCase();
    this.#phone = phone;
  }

  set firstname (firstname) {
    this.#firstname = firstname.trim().toUpperCase();
  }

  get firstname () {
    return this.#firstname;
  }

  set lastname (lastname) {
    this.#lastname = lastname.trim().toUpperCase();
  }

  get lastname () {
    return this.#lastname;
  }

  set phone (phone) {
    this.#phone = phone;
  }

  get phone () {
    return this.#phone;
  }

  isPhoneValid () {
    if (this.#phone.match(/[0-9]{10}/)) {
      return true;
    }
    else {
      return false;
    }
  }
}

export default Person;