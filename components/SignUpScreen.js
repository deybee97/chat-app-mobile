import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native';
import { Button, Card, Text, TextInput} from 'react-native-paper';



export default class SignUpScreen extends React.Component {

    // theme = useTheme()
   state = {
     username : '',
     password : '',
     confirmPassword: '',
     firstName: '',
     lastName: '',

   }

    render(){
        return (
            <Card style={styles.LoginCard} >
            <Card.Title title="Sign Up" />
            <Card.Content>
              <TextInput
              style={styles.SignupInput}
              label='first name'
              value={this.state.firstName}
              onChangeText={firstName=> this.setState({firstName})}
              />
              <TextInput
              style={styles.SignupInput}
              label='last name'
              value={this.state.lastName}
              onChangeText={lastName=> this.setState({lastName})}
              />
              <TextInput
              style={styles.SignupInput}
              label='username'
              value={this.state.username}
              onChangeText={username=> this.setState({username})}
              />
              <TextInput
              style={styles.SignupInput}
                label='password'
                value={this.state.password}
                onChangeText={password=> this.setState({password})}
                secureTextEntry
                right={<TextInput.Icon icon="eye"  onPress={e=>GestureResponderEvent(e)}/>}
              />
               <TextInput
              style={styles.SignupInput}
                label='confrim password'
                value={this.state.confirmPassword}
                onChangeText={confirmPassword=> this.setState({confirmPassword})}
                secureTextEntry
                right={<TextInput.Icon icon="eye"  onPress={e=>GestureResponderEvent(e)}/>}
              />

            </Card.Content>
            
            <Card.Actions>
              <Button  onPress={()=>this.props.navigation.navigate('Login')}>Login</Button>
              <Button>SignUp</Button>
            </Card.Actions>
          </Card>
          )

    }
  
}

SignUpScreen.propTypes = {

}

const styles = StyleSheet.create({
    
    LoginCard : {
        width: '50%',
        marginHorizontal: 'auto',
        marginVertical: 'auto',
        backgroundColor: 'black',
        padding: '20px',
    },
    SignupInput:{
        backgroundColor: 'black',
        marginBottom: '20px'
    }
})


