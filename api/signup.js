import axios from 'axios'


const signup=  async (userName, password, firstName, lastName) => {
    
    
    try {
        const response = await axios.post('http://localhost:3001/signup',{
            firstName,
            lastName,
            userName,
            password,
            type: "consumer"
          })

        //  return response.data
        return response.data
        
    } catch (error) {
        console.log(error)
    }
   
   
}

export default signup