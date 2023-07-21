import axios from "axios"




export const initiateConversation =  async(receiverId, token) => {

    try {

        const response = await axios.post('http://localhost:3001/room/initiate',
    {
        "userIds": [receiverId],
        "type": "consumer-to-consumer"  
    },
   
    {

        headers: {
            'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        }
    }

    )
   
    return response.data
        
    } catch (error) {
        throw error
    }

}


export const sendMessage = async(chatRoom, message, token) => {

    try {

        const response = await axios.post(`http://localhost:3001/room/${chatRoom}/message`, {
            "messageText": message,
            
        },{
            headers:{
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        })

        return response.data
        
    } catch (error) {
        
    }

}

export const retrieveOldMessages = async(chatRoom, token)=> {
    try {
        const response = await axios.get(`http://localhost:3001/room/${chatRoom}`,{
        headers:{
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
      }

       
    )

    return response.data
    } catch (error) {
        
    }
}

export const getRecentConversations = async(token) => {
    try {
        const response = await axios.get('http://localhost:3001/room',
        {
            headers:{
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        }
        )
        return response.data
    } catch (error) {
        
    }
}