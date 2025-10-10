class Person {
  #id = 0;
  #firstname = "";
  #lastname = "";
  #phone = "";

  constructor(id: number = 0, firstname: string, lastname: string, phone: string) {
    this.#id = id;
    this.#firstname = firstname;
    this.#lastname = lastname;
    this.#phone = phone;
  }

  get id () {
    return this.#id;
  }

  set id (id: number) {
    this.#id = id;
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

  isPhoneValid (phone: string) {
    if (phone.match(/[0-9]{10}/)) {
      this.#phone = phone;
      return true;
    }
    else {
      return false;
    }
  }
}

export default Person;