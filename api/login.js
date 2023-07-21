import axios from 'axios'


const login =  async (username, password) => {
    
    console.log(username, password)
    try {
        const response = await axios.post('http://localhost:3001/login',{
            userName: username,
            password
          })

         return response.data
        
    } catch (error) {
        console.log(error.response.data.error)
    }
   
   
}

export default login