const appointmentAPI = {
  createAppointment: async (customerId: number, assignedSection: number, date: string, startTime: string, endTime: string, description: string) => {
    let result;
    
    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/appointment`, 
      {
        method: "POST",
        body: JSON.stringify({
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
  }
}

export default appointmentAPI;