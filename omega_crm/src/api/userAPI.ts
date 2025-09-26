const userAPI = {
  login: () => {
    
    fetch(import.meta.env.VITE_SERVER_URL)
      // .then(response => response.json())
      // .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }
}

// { username, password}: {username: string; password: string}

export default userAPI;