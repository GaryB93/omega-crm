const appointmentAPI = {
  createAppointment: async (userId: number, customerId: number, assignedSection: number, date: string, startTime: string, endTime: string, description: string) => {
    let result;
    const timestamp = new Date();

    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/appointment`, 
      {
        method: "POST",
        body: JSON.stringify({
          timestamp: timestamp,
          user: userId,
          section: assignedSection,
          customer: customerId,
          date: date,
          startTime: startTime,
          endTime: endTime,
          description: description
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => result = data)
      .catch(err => console.error('Error:', err));

    return result;
  },

  editAppointment: async (appointmentId: number, userId: number, assignedSection: number, date: string, startTime: string, endTime: string, description: string) => {
    let result;
    const timestamp = new Date();

    await fetch (`${import.meta.env.VITE_SERVER_URL}/api/appointment`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: appointmentId,
          user: userId,
          section: assignedSection,
          date: date,
          startTime: startTime,
          endTime: endTime,
          description: description,
          timestamp: timestamp,
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => result = data)
      .catch(err => console.error('Error:', err));

    return result;
  },

  deleteAppointment: async (appointmentId: number) => {
    let result;

    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/appointment?id=${appointmentId}`,
      {
        method: "DELETE",
      })
      .then(response => response.json())
      .then(data => result = data)
      .catch(err => console.error('Error:', err));
      
    return result;
  },

  getAppointmentsByCustomer: async (customerId: number) => {
    let result;

    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/appointment?customer=${customerId}`,
      {
        method: "GET",
      })
      .then(response => response.json())
      .then(data => result = data)
      .catch(err => console.error('Error:', err));

    return result;
  }
}

export default appointmentAPI;