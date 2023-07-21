import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, } from 'react-native';
import { Button, Card, Text, TextInput} from 'react-native-paper';
import login from '../api/login';
import { useAuth } from './UserContext';


const LoginScreen  = ({navigation})=>{

    // theme = useTheme()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {loginUser: authLogin} = useAuth()
   

   const loginUser =  async ()=> {

     if (username.length > 1 && password.length >1 ){
        

      console.log(authLogin)
        try{
          const {authorization, userId} = await authLogin(username, password)

          console.log(authorization, userId)
         
          navigation.navigate('/')
        }
        catch(error){
          console.log(error)
        }
     }
   }


        return (
            <Card style={styles.LoginCard} >
            <Card.Title title="Login" />
            <Card.Content>
              <TextInput
              style={styles.LoginInput}
              label='username'
              value={username}
              onChangeText={username=> setUsername(username)}
              />
              <TextInput
              style={styles.LoginInput}
                label='password'
                value={password}
                onChangeText={password=> setPassword(password)}
                secureTextEntry
                right={<TextInput.Icon icon="eye"  onPress={e=>GestureResponderEvent(e)}/>}
              />
            </Card.Content>
            
            <Card.Actions>
              <Button onPress={()=> navigation.navigate('SignUp')}>SignUp</Button>
              <Button onPress={loginUser}>Login</Button>
            </Card.Actions>
          </Card>
          )

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


export default LoginScreen

