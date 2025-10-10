import type { NewUserInterface } from "../classes/NewUser";

const userAPI = {

  login: async (username: string, password: string) => {
    const result = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/login`,
      {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

    return result;
  },

  getUsers: async (formState: {firstname: string; lastname: string; role: string;}) => {
    const result = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user?firstname=${formState.firstname}&lastname=${formState.lastname}&role=${formState.role}`,
      {
        method: "GET"
      })

    return result;
  },

  saveUser: async (user: NewUserInterface) => {
    const result = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user`,
      {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"
        }
      })

    return result;
  },

  addUser: async (newUser: NewUserInterface) => {
    const result = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user`,
      {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json"
        }
      })

    return result;
  },

  deleteUser: async (userID: number) => {
    const result = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/${userID}`,
      {
        method: "DELETE"
      })

    return result;
  }
  
}



export default userAPI;