import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text, TextInput} from 'react-native-paper';
import login from '../api/login';
import { useAuth } from './UserContext';


const LoginScreen  = ({navigation})=>{

    // theme = useTheme()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState(null)
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
          setMsg(error.response.data.error)
          
        }
     }else{
        setMsg("Enter valid details")

      
     }
   }


   const onSetUsername = (username)=> {
    setMsg(null)
    setUsername(username)
   }

   const onSetPassword = (password)=> {
    setMsg(null)
    setPassword(password)
   }


        return (
        <View style={styles.container}>
            <Card style={styles.LoginCard} >

            {msg && (
               <Card style={styles.messageCard}>
                  <Card.Content>
                    <Text>{msg}</Text>
                  </Card.Content>
                </Card>
            )}
            <Card.Title title="Login" />
            <Card.Content>
              <TextInput
              style={styles.LoginInput}
              label='username'
              value={username}
              onChangeText={username=> onSetUsername(username)}
              />
              <TextInput
              style={styles.LoginInput}
                label='password'
                value={password}
                onChangeText={password=> onSetPassword(password)}
                secureTextEntry
                right={<TextInput.Icon icon="eye"  onPress={e=>GestureResponderEvent(e)}/>}
              />
            </Card.Content>
            
            <Card.Actions>
              <Button onPress={()=> navigation.navigate('SignUp')}>SignUp</Button>
              <Button onPress={loginUser}>Login</Button>
            </Card.Actions>
          </Card>
          </View>
          )

    }
  


LoginScreen.propTypes = {

}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageCard: {
    marginBottom: 20,
    padding: 5,
    backgroundColor: 'red', // Change the background color to your preference
    width: '100%',
  },
    
    LoginCard : {
        width: '50%',
        // marginHorizontal: 'auto',
        // marginVertical: 'auto',
        backgroundColor: 'black',
        padding: '20px',
    },
    LoginInput:{
        backgroundColor: 'black',
        marginBottom: '20px'
    }
})


export default LoginScreen

