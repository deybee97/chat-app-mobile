import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import React from 'react';
import LoginScreen from './components/LoginScreen';
import Nav from './components/Nav';
import { AuthProvider } from './components/UserContext';

export default class App extends React.Component {

  render(){
    return (
      <AuthProvider>
      <PaperProvider>
        {/* <View style={styles.container}> */}

          <Nav/>
        {/* </View> */}
      </PaperProvider>
      </AuthProvider>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
