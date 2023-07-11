import { StatusBar } from 'expo-status-bar';
import  { StyleSheet, Text, View, Button } from 'react-native';

import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack'
// import { Button, Card, Text, TextInput} from 'react-native-paper';

import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
// import { connect } from 'react-redux';



const Main = createNativeStackNavigator()
const Auth =  createNativeStackNavigator()

export default class Nav extends React.Component{

  state = {
    token: localStorage.getItem("token") || null
  }
  

  setToken = (token) => {
    this.setState({token})
  }

  // login = (token) => {
  //   this.setState({token})
  // }
  render(){
    return (

 
      <View style={styles.container}>
        
        <NavigationContainer>
        { this.state.token ? (
          <Main.Navigator initialRouteName='Home'>
            <Main.Screen name='Home' component={HomeScreen} />
          </Main.Navigator>
        
        ): (
          <Auth.Navigator>
            <Auth.Screen name='Login' component={()=><LoginScreen setToken={this.setToken}/>}  />
            <Auth.Screen name='SignUp' component={() => <SignUpScreen setToken={this.setToken} />} />
          </Auth.Navigator>
        )
        }
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
