import Person from "./Person";

class Customer extends Person {
  #id = 0;
  #textreminder = false;

  constructor(id: number = 0, firstname: string, lastname: string, phone: string, textreminder: boolean = false) {
    super(firstname, lastname, phone);
    this.#id = id;
    this.#textreminder = textreminder;
  }

  get id () {
    return this.#id;
  }

  set id (id: number) {
    this.#id = id;
  }

  set textreminder (textreminder) {
    this.#textreminder = textreminder;
  }

  get textreminder () {
    return this.#textreminder;
  }

  displayInfo(): void {
    console.log(`id: ${this.#id}\n
                 firstname: ${this.firstname}\n
                 lastname: ${this.lastname}\n
                 phone: ${this.phone}\n
                 textreminder: ${this.#textreminder}`);
  }
}

export default Customer;