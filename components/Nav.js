import { StatusBar } from 'expo-status-bar';
import  { StyleSheet, Text, View, Button } from 'react-native';

import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack'
// import { Button, Card, Text, TextInput} from 'react-native-paper';

import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import ChatView from './ChatView';
import Conversation from './Conversation';
import { SocketProvider } from './SocketContext';
// import { connect } from 'react-redux';



const Main = createNativeStackNavigator()
const Auth =  createNativeStackNavigator()

export default class Nav extends React.Component{

  state = {
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null
  }
  

  setToken = (token) => {
    this.setState({token})
  }

  setUser = (userId) => {
    this.setState({userId})
  }

  // login = (token) => {
  //   this.setState({token})
  // }
  render(){
    return (

 
      <View style={styles.container}>
        
        <NavigationContainer>
          <SocketProvider>
        { this.state.token ? (
          <Main.Navigator initialRouteName='Conversation'>
            <Main.Screen name='Conversation' 
            component={(props)=><Conversation token={this.state.token}  userId={this.state.userId} {...props} />}
            options={({navigation})=> ({
              headerRight: () => (
                <Button title="contacts" onPress={() => navigation.navigate('Home')} />
              ),
            })}

             />
            <Main.Screen name='Home' component={(props)=><HomeScreen token={this.state.token} {...props} />} />
            <Main.Screen name='Chat' 
              component={(props)=><ChatView token={this.state.token} userId={this.state.userId} {...props}/>} 
              options={({route})=>({
                title: route.params.title
              })}
            />
          </Main.Navigator>
 
        ): (
          <Auth.Navigator>
            <Auth.Screen name='Login' component={()=><LoginScreen setToken={this.setToken} setUser={this.setUser}/>}  />
            <Auth.Screen name='SignUp' component={() => <SignUpScreen setToken={this.setToken} setUser={this.setUser} />} />
          </Auth.Navigator>
        )
        }
        </SocketProvider>
        </NavigationContainer>
        
      </View>

    );

  }
  
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
