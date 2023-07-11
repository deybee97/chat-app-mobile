import axios from "axios"


export const getAllUsers = async ()=> {

    try {
        const response = await axios.get('http://localhost:3001/users')
        return response.data.users
    } catch (error) {
        console.log(error)
    }

   
}


