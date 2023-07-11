import axios from "axios"



export const initiateConversation =  async(senderId, receiverId, token) => {

   const response = await axios.post('http://localhost:3000/room/initiate', {

        authorizarion: `Bearer ${token}`,
        body:{
            "userIds": [senderId, receiverId],
            "type": "consumer-to-consumer"  
        }
    })

    

    console.log(response)


}