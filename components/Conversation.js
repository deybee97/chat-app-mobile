import React from 'react'
import { View , ScrollView,TouchableOpacity} from 'react-native'
import {getRecentConversations} from '../api/chatRoom.js'
import User from './User.js'
import { Text } from 'react-native-paper'
import { initiateConversation } from '../api/chatRoom.js'



export default class Conversation extends React.Component{


  state = {
    conversations: []
  }

  async componentDidMount(){

    console.log(this.props.userId)
    try {
     const data = await getRecentConversations(this.props.token)
   
      console.log(data.conversation, this.props.token, this.props.userId)
    
    const  cleanedConversation = data.conversation.map(conv=>({
        lastMessage: conv.message.messageText,
        postedBy: conv.postedByUser._id,
        userInfo: conv.roomInfo.find((info) => info[0]._id !== this.props.userId.trim() )[0]
    }))
    
    console.log(cleanedConversation)
     this.setState({conversations:cleanedConversation})
    } catch (error) {
      console.log(error)
    }
     
  }

  initiateConversation = async(receiverId, firsName)=> {

    try {
      const chatRoomInfo = await initiateConversation(receiverId, this.props.token)
      console.log(chatRoomInfo)
      this.props.navigation.navigate('Chat', {
        chatRoomInfo,
        title: firsName
      })

    } catch (error) {
       console.log(error)
    }
    
  }

  render(){
    return (
      <ScrollView>
        {
          this.state.conversations.length > 0 && 
          this.state.conversations.map(convo=>
            <TouchableOpacity key={convo.userInfo._id} onPress={()=> this.initiateConversation(convo.userInfo._id, convo.userInfo.firstName)}> 
             <User  firsName={convo.lastMessage} lastName={convo.userInfo.lastName} />
             </TouchableOpacity>
          )
        }
      </ScrollView>
    )
  }

  
}


