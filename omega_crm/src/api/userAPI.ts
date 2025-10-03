const userAPI = {

  login: async (username: string, password: string) => {
    let result: Promise<object>;
    
    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/login`, {
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
  }


  
}



export default userAPI;