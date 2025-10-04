const scheduleAPI = {
  getSchedules: async (scheduleID = 0, date: string) => {
    let result;

    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/schedule?schedule=${scheduleID}&date=${date}`,
      {
        method: "GET",
      })
      .then(response => response.json())
      .then(data => result = data)
      .catch(error => console.error('Error:', error)
    );

    return result;
  },

  addSchedule: async (scheduleName: string) => {
    let result;
    
    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/schedule`,
      {
        method: "POST",
        body: JSON.stringify({ name: scheduleName }),
        headers: {"Content-Type": "application/json"},
      })
      .then(response => response.json())
      .then(data => result = data)
      .catch(error => console.error('Error:', error)
    );

    return result;
  },

  addSection: async(sectionName: string, scheduleID: number) => {
    let result;

    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/schedule/section`,
      {
        method: "POST",
        body: JSON.stringify({ sectionName: sectionName, scheduleId: scheduleID}),
        headers: {"Content-Type": "application/json"},
      })
      .then(response => response.json())
      .then(data => result = data)
      .catch(error => console.error('Error', error)
    );

    return result;
  }
}

export default scheduleAPI;