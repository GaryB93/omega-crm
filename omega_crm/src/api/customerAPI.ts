import type Customer from "../classes/Customer";

const customerAPI = {
  getCustomers: async (firstName: string, lastName: string, phone: string) => {
    let result;

    await fetch(`/api/customer?firstName=${firstName}&lastName=${lastName}&phone=${phone}`,
      {
        method: "GET",
      }
    ).then(response => response.json())
    .then(data => result = data)
    .catch(err => console.error('Error', err));

    return result;
  },

  saveCustomer: async ({id, firstname, lastname, phone, textreminder}: Customer) => {
    const method = id == 0 ? "POST" : "PUT";

    const result = await fetch(`/api/customer`,
      {
        method: method,
        body: JSON.stringify({
          id: id,
          firstName: firstname,
          lastName: lastname,
          phone: phone,
          textReminder: textreminder
        }),
        headers: {"Content-Type": "application/json"}
      }
    );

    return result;
  }
}

export default customerAPI;