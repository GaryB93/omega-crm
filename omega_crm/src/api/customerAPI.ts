const customerAPI = {
  getCustomers: async (firstName: string, lastName: string, phone: string) => {
    let result;

    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/customer?firstName=${firstName}&lastName=${lastName}&phone=${phone}`,
      {
        method: "GET",
      }
    ).then(response => response.json())
    .then(data => result = data)
    .catch(err => console.error('Error', err));

    return result;
  },

  saveCustomer: async (id: number = 0, firstName: string, lastName: string, phone: string, textReminder: boolean) => {
    let result;
    const method = id == 0 ? "POST" : "PUT";

    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/customer`,
      {
        method: method,
        body: JSON.stringify({
          id: id,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          textReminder: textReminder
        }),
        headers: {"Content-Type": "application/json"}
      }
    )
    .then(response => response.json())
    .then(data => result = data)
    .catch(err => console.error('Error', err));

    return result;
  }
}

export default customerAPI;