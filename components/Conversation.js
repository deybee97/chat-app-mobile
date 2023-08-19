import React, { useEffect, useState } from 'react'
import { View , ScrollView,TouchableOpacity} from 'react-native'
import {getRecentConversations} from '../api/chatRoom.js'
import User from './User.js'
import { Text } from 'react-native-paper'
import { initiateConversation } from '../api/chatRoom.js'
import { useSocket } from './SocketContext'
import { useAuth } from './UserContext';
import { deleteConversationById } from '../api/delete.js'

 const Conversation  = (props) => {



   const [conversations,setConversation]  = useState([])
   const [selectedConvoId, setSelectedConvoId] = useState(null)
   const {userId,token}= useAuth()
   const socket = useSocket();
   
  

  const getConversations = async()=>{
    try {
      const data = await getRecentConversations(token)
    
 
     
     const  cleanedConversation = data.conversation.map(conv=>({
         lastMessage: conv.message.messageText,
         postedBy: conv.postedByUser._id,
         userInfo: conv.roomInfo.find((info) => info[0]._id !== props.userId.trim() )[0]
     }))
     

     console.log(cleanedConversation)
      setConversation([...cleanedConversation])
       
    
      
      
     } catch (error) {
       console.log(error)
     }
   }


 
  useEffect(()=>{
    getConversations()
  },[])


  useEffect(()=>{
  
    if(socket)
    {
      socket.emit("login", userId)
    
      socket.on("update convo",handleConversationUpdate)
    }
    
    
     
  },[socket, conversations])


  const initConversation = async(receiverId, firsName)=> {

    try {
      const chatRoomInfo = await initiateConversation(receiverId, token)
      console.log(chatRoomInfo)
      props.navigation.navigate('Chat', {
        chatRoomInfo,
        title: firsName
      })

    } catch (error) {
       console.log(error)
    }
    
  }

  const handleConversationUpdate = (data)=>{
     
    const {receipientId, messagePayload, postedBy} = data
    console.log(receipientId, messagePayload, postedBy)
    console.log(conversations)
    const updatedConversation = conversations.map(conversation=>{
      console.log(conversation.userInfo._id);
       if(conversation.userInfo._id === receipientId){

         return {
          ...conversation,
          lastMessage: messagePayload.messageText,
          postedBy,
         }
       }else{
        return conversation
       }
    })
     setConversation(updatedConversation)
  }

  const deleteConversation = async()=> {

    if(selectedConvoId){x
   
     const data = await deleteConversationById(token, selectedConvoId)

     const updatedConvo= conversations.filter(conversation=> conversation.id !== selectedConvoId)
     setConversation(updatedConvo)
     selectedMessageId = null
    }

     // update existing message
  }



    return (
      <ScrollView>
        {
          conversations.length > 0 && 
          conversations.map(convo=>
            <TouchableOpacity key={convo.userInfo._id} onPress={()=> initConversation(convo.userInfo._id, convo.userInfo.firstName)}> 
             <User  firsName={convo.lastMessage} lastName={convo.userInfo.lastName} />
             </TouchableOpacity>
          )
        }
      </ScrollView>
    )
  

  
}

export default Conversation


