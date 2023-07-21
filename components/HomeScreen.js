import React from 'react'
import { View , ScrollView,TouchableOpacity} from 'react-native'
import {getAllUsers} from '../api/users.js'
import User from './User.js'
import { Text } from 'react-native-paper'
import { initiateConversation } from '../api/chatRoom.js'



export default class HomeScreen extends React.Component{


  state = {
    users: []
  }

  async componentDidMount(){
    try {
     const users = await getAllUsers()
     console.log(users, this.props.token)
     this.setState({users})
    } catch (error) {
      console.log(error)
    }
     
  }

  initiateConversation = async(receiverId, firstName)=> {

    try {
      const chatRoomInfo = await initiateConversation(receiverId, this.props.token)
      console.log(chatRoomInfo)
      this.props.navigation.navigate('Chat', {
        chatRoomInfo,
        title: firstName
      })

    } catch (error) {
       console.log(error)
    }
    
  }

  render(){
    return (
      <ScrollView>
        {
          this.state.users.length > 0 && 
          this.state.users.map(user=>
            <TouchableOpacity key={user._id} onPress={()=> this.initiateConversation(user._id, user.firstName)}> 
             <User  firsName={user.firstName} lastName={user.lastName} />
             </TouchableOpacity>
          )
        }
      </ScrollView>
    )
  }

  
}


