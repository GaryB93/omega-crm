const scheduleAPI = {
  getSchedules: async (scheduleID = 0) => {
    let result;

    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/schedule?schedule=${scheduleID}`, {
      method: "GET",
    })
    .then(response => response.json())
    .then(data => result = data)
    .catch(error => console.error('Error:', error))

    return result;
  },

  addSchedule: async (scheduleName: string): Promise<object> => {
    let result: object;
    
    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/schedule`, {
      method: "POST",
      body: JSON.stringify({ name: scheduleName }),
      headers: {"content-Type": "application/json"},
    })
    .then(response => response.json())
    .then(data => result = data)
    .catch(error => console.error('Error:', error))

    return result;
  }
}

export default scheduleAPI;