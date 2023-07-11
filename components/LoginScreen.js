import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native';
import { Button, Card, Text, TextInput} from 'react-native-paper';
import login from '../api/login';


export default class LoginScreen extends React.Component {

    // theme = useTheme()
   state = {
     username : '',
     password : '',
   }

   loginUser =  async ()=> {

    
     
     if (this.state.username.length > 1 && this.state.password.length >1 ){

        try{
          const token = await login(this.state.username, this.state.password)
          this.props.setToken(token)
          localStorage.setItem('token', token)
          this.props.navigation.navigate('/')
        }
        catch(error){
          console.log(error)
        }
     }
   }

    render(){
        return (
            <Card style={styles.LoginCard} >
            <Card.Title title="Login" />
            <Card.Content>
              <TextInput
              style={styles.LoginInput}
              label='username'
              value={this.state.username}
              onChangeText={username=> this.setState({username})}
              />
              <TextInput
              style={styles.LoginInput}
                label='password'
                value={this.state.password}
                onChangeText={password=> this.setState({password})}
                secureTextEntry
                right={<TextInput.Icon icon="eye"  onPress={e=>GestureResponderEvent(e)}/>}
              />
            </Card.Content>
            
            <Card.Actions>
              <Button onPress={()=> this.props.navigation.navigate('SignUp')}>SignUp</Button>
              <Button onPress={this.loginUser}>Login</Button>
            </Card.Actions>
          </Card>
          )

    }
  
}

LoginScreen.propTypes = {

}

const styles = StyleSheet.create({
    
    LoginCard : {
        width: '50%',
        marginHorizontal: 'auto',
        marginVertical: 'auto',
        backgroundColor: 'black',
        padding: '20px',
    },
    LoginInput:{
        backgroundColor: 'black',
        marginBottom: '20px'
    }
})


