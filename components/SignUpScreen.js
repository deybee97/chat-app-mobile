import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native';
import { Button, Card, Text, TextInput} from 'react-native-paper';
import { useAuth } from './UserContext';


const  SignUpScreen = ({navigation}) => {

    // theme = useTheme()
  
    const {signUpUser: authSignup} = useAuth()

   const [username, setUsername] = useState("")
   const [password, setPassword] = useState("")
   const [confirmPassword, setConfirmPassword] = useState("")
   const [firstName, setFirstName] = useState("")
   const [lastName,setLastname] = useState("")


   const signUpUser = async() => {


     
    if(password.length >10 && password.trim() === confirmPassword.trim() && firstName.length > 2 && lastName.length > 2) {
      console.log("sign uo")
      await  authSignup(username,password,firstName,lastName)

      navigation.navigate('/')
    }else{
      console.log("provide the complete credentials")
    }
    

   }


        return (
            <Card style={styles.LoginCard} >
            <Card.Title title="Sign Up" />
            <Card.Content>
              <TextInput
              style={styles.SignupInput}
              label='first name'
              value={firstName}
              onChangeText={firstName=> setFirstName(firstName)}
              />
              <TextInput
              style={styles.SignupInput}
              label='last name'
              value={lastName}
              onChangeText={lastName=> setLastname(lastName)}
              />
              <TextInput
              style={styles.SignupInput}
              label='username'
              value={username}
              onChangeText={username=> setUsername(username)}
              />
              <TextInput
              style={styles.SignupInput}
                label='password'
                value={password}
                onChangeText={password=> setPassword(password)}
                secureTextEntry
                right={<TextInput.Icon icon="eye"  onPress={e=>GestureResponderEvent(e)}/>}
              />
               <TextInput
              style={styles.SignupInput}
                label='confrim password'
                value={confirmPassword}
                onChangeText={confirmPassword=> setConfirmPassword(confirmPassword)}
                secureTextEntry
                right={<TextInput.Icon icon="eye"  onPress={e=>GestureResponderEvent(e)}/>}
              />

            </Card.Content>
            
            <Card.Actions>
              <Button  onPress={()=>navigation.navigate('Login')}>Login</Button>
              <Button onPress={()=> signUpUser()}>SignUp</Button>
            </Card.Actions>
          </Card>
          )


  
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

export default SignUpScreen
