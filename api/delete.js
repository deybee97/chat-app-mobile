
import axios from "axios"

export const deleteMessageById = async(token, messageId)=> {

  try {

  const response  = await axios.delete(`http://localhost:3001/delete//message/${messageId}`,
    {

        headers: {
          'authorization': `Bearer ${token}`
        }
    })

    return response.data
    
  } catch (error) {
    console.log(error)
  }
} 


export const deleteConversationById = async(token, roomId)=> {

    try {
  
    const response  = await axios.delete(`http://localhost:3001/delete//room/${roomId}`,
      {
  
          headers: {
            'authorization': `Bearer ${token}`
          }
      })
  
      return response.data
      
    } catch (error) {
      console.log(error)
    }
  } 