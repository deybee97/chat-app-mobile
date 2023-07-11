import React from 'react'
import { View } from 'react-native'
import {getAllUsers} from '../api/users.js'
import User from './User.js'

export default class HomeScreen extends React.Component{


  state = {
    users: []
  }

  async componentDidMount(){
    try {
     const users = await getAllUsers()
     console.log(users)
     this.setState({users})
    } catch (error) {
      console.log(error)
    }
     
  }

  render(){
    return (
      <View>
        
      </View>
    )
  }

  
}


