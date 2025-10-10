import Person from "./Person";

class Customer extends Person {
  #textreminder = false;

  constructor(id: number = 0, firstname: string, lastname: string, phone: string, textreminder: boolean = false) {
    super(id, firstname, lastname, phone);
    this.#textreminder = textreminder;
  }

  set textreminder (textreminder) {
    this.#textreminder = textreminder;
  }

  get textreminder () {
    return this.#textreminder;
  }
}

export default Customer;