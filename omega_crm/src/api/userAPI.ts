const userAPI = {

  login: async (username: string, password: string) => {
    let result;
    
    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/login`,
      {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password
        }),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors"
      })
      .then(response => response.json())
      .then(data => result = data)
      .catch(error => console.error('Error:', error));

    return result;
  },

  getUsers: async (formState: {firstname: string; lastname: string; role: string;}) => {
    let result;

    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user?firstname=${formState.firstname}&lastname=${formState.lastname}&role=${formState.role}`,
      {
        method: "GET"
      })
      .then(response => response.json())
      .then(data => result = data)
      .catch(error => console.error('Error:', error));

    return result;
  },

  saveUser: async (formState: {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    schedule: number;
    role: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    let result;

    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user`,
      {
        method: "PUT",
        body: JSON.stringify(formState),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => result = data)
      .catch(error => console.error('Error:', error));

    return result;
  },

  addUser: async (formState: {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    schedule: number;
    role: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    let result;

    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user`,
      {
        method: "POST",
        body: JSON.stringify(formState),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => result = data)
      .catch(error => console.error('Error:', error));

    return result;
  },

  deleteUser: async (userID: number) => {
    let result;
    
    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/${userID}`,
      {
        method: "DELETE"
      })
      .then(response => response.json())
      .then(data => result = data)
      .catch(error => console.error('Error:', error));

    return result;
  }
  
}



export default userAPI;