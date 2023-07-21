import React from 'react'
import { List } from 'react-native-paper';
import { View, StyleSheet, Image,Text } from 'react-native';
import profile  from '../assets/profile.png'


const User = ({firsName, lastName}) => {
  return (
    <View>
       <Image source="profile" style={styles.profilePicture} />
      <View style={styles.conversationTextContainer}>
        <Text style={styles.conversationName}>{lastName}</Text>
        <Text style={styles.conversationLastMessage}>{firsName}</Text>
      </View>
    </View>
   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  conversationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  conversationTextContainer: {
    flex: 1,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  conversationLastMessage: {
    fontSize: 14,
    color: '#666',
  },
});


export default User

