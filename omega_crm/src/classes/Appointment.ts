class Appointment {
  #id: number;
  #customer: number;
  #date: string;
  #startTime: string;
  #endTime: string;
  #description: string;
  #section: number;

  constructor(id:number, customer: number, date: string, startTime: string, endTime: string, description: string, section: number) {
    this.#id = id;
    this.#customer = customer;
    this.#date = date;
    this.#startTime = startTime;
    this.#endTime = endTime;
    this.#description = description;
    this.#section = section;
  }

  get id () {
    return this.#id;
  }

  set id (id: number) {
    this.#id = id;
  }

  get customer () {
    return this.#customer;
  }

  set customer (customer: number) {
    this.#customer = customer;
  }

  get date () {
    return this.#date;
  }

  set date (date: string) {
    this.#date = date;
  }

  get startTime () {
    return this.#startTime;
  }

  set startTime (startTime: string) {
    this.#startTime = startTime;
  }

  get endTime () {
    return this.#endTime;
  }

  set endTime (endTime: string) {
    this.#endTime = endTime;
  }

  get description () {
    return this.#description;
  }

  set description (description: string) {
    this.#description = description;
  }

  get section () {
    return this.#section;
  }

  set section (section: number) {
    this.#section = section;
  }
}

export default Appointment;