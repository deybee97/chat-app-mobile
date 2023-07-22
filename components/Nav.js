import { StatusBar } from 'expo-status-bar';
import  { StyleSheet, Text, View, Button } from 'react-native';

import React, { useEffect, useState } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack'
// import { Button, Card, Text, TextInput} from 'react-native-paper';

import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import ChatView from './ChatView';
import Conversation from './Conversation';
import { SocketProvider } from './SocketContext';
import { useAuth } from './UserContext';

// import { connect } from 'react-redux';



const Main = createNativeStackNavigator()
const Auth =  createNativeStackNavigator()

const  Nav = () => {

  // state = {
  //   token: localStorage.getItem("token") || null,
  //   userId: localStorage.getItem("userId") || null
  // }
  


  // setToken = (token) => {
  //   this.setState({token})
  // }

  // setUser = (userId) => {
  //   this.setState({userId})
  // }

  // login = (token) => {
  //   this.setState({token})
  // }
 
  const {token, userId,logoutUser} = useAuth()



    return (

 
      <View style={styles.container}>
        
        <NavigationContainer>
         
          <SocketProvider>
        { token ? (
          <Main.Navigator initialRouteName='Conversation'>
           
            <Main.Screen name='Conversation' 
            component={(props)=><Conversation token={token}  userId={userId} {...props} />}
            options={({navigation})=> ({
              headerRight: () => (
                <>
                <Button title="contacts" onPress={() => navigation.navigate('Home')} />
                <Button title="logout" onPress={logoutUser}/>
                </>
              ),
            })}

             />
            <Main.Screen name='Home' component={(props)=><HomeScreen token={token} {...props} />} />
            <Main.Screen name='Chat' 
              component={(props)=><ChatView token={token} userId={userId} {...props}/>} 
              options={({route})=>({
                title: route.params.title
              })}
            />
          </Main.Navigator>
 
        ): (
          <Auth.Navigator>
            <Auth.Screen name='Login' component={(props)=><LoginScreen {...props} />}  />
            <Auth.Screen name='SignUp' component={(props) => <SignUpScreen  {...props} />} />
          </Auth.Navigator>
        )
        }
        </SocketProvider>
          
        </NavigationContainer>
        
      </View>

    );

  
  
}

// const mapStateToProps = (state)=>({
   
//    user: state.user
// })

// export default connect(mapStateToProps)(Nav)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,

  },
});


export default Nav
