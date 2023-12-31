import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { retrieveOldMessages, sendMessage, markMessageAsRead as markAsRead } from '../api/chatRoom'; // Import the API functions
import { useSocket } from './SocketContext'; // Import the socket context
import { useAuth } from './UserContext';
import axios from 'axios';
import { deleteMessageById } from '../api/delete';
import { Ionicons } from '@expo/vector-icons'


const ChatView = ({route, navigation}) => {


  const {token, userId} = useAuth()

  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatInfo, setChatInfo] = useState(null);
  const [isNewChatRoom, setIsNewChatRoom] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null)

  
  const socket = useSocket();
  
  // socketConnection()

  


  useEffect(() => {


    
    const { chatRoomInfo } = route.params;
    console.log(socket)
    const chatInfo = chatRoomInfo.chatRoom;
   
    setChatInfo(chatInfo);
    setIsNewChatRoom(chatInfo.isNew);

    
    // socket.on('connect', handleSocketConnect);
    socket.on('new message', handleSocketNewMessage);
 

    socket.emit("identity", userId)
    socket.emit("subscribe", chatInfo.chatRoomId)

    if (!chatInfo.isNew) {
     
      retrieveOldMessagesAndSetState(chatInfo.chatRoomId, token);
    }

   markMessageAsRead(chatInfo.chatRoomId)
    
    // return () => {
    //   socket.disconnect();
    // };

     // Set the header right button for delete
  
  }, [socket]);


  const deleteMessage = useCallback(async()=> {
    
    console.log(selectedMessageId)
    if(selectedMessageId){
      
     const data = await deleteMessageById(token, selectedMessageId)
     console.log(data)

     const updatedMessages = messages.filter(message=> message.id !== selectedMessageId)
     setMessages(updatedMessages)
     setSelectedMessageId(null)
    }

     // update existing message
  }, [selectedMessageId, messages, token])

  useEffect(() => {
    // ... your existing code

    // Set the header right button for delete
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={deleteMessage} style={styles.headerButton}>
          <Ionicons name="trash-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
    });

    // ... your existing code
  }, [socket, deleteMessage, navigation]);

  const handleSocketConnect = () => {
    console.log('WebSocket connected');
  };

  const handleSocketNewMessage = (data) => {
    console.log("message received")
  
    
    setMessages(prev=>{
      
 
      const newMsg = {
        id: data.message[0].postId,
        text: data.message[0].message.messageText,
        by: data.by,
      }
      return(
        [...prev, newMsg]
      )
    })
  };


  const markMessageAsRead = async(chatRoomId)=> {

   const data =   await markAsRead(chatRoomId, token)
    
   console.log(data)
  }

  

  const retrieveOldMessagesAndSetState = async (chatRoomId, token) => {

    try {
      const data = await retrieveOldMessages(chatRoomId, token);


      const conversation = data.conversation.map((conversation) => ({
        id: conversation._id,
        text: conversation.message.messageText,
        by: conversation.postedByUser._id
      }));

      setMessages((prevMessages) => [...prevMessages, ...conversation]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async () => {
  

    socket.emit('message', { message: chat });

    if (chatInfo && chat.trim() !== '') {
      const { isNew, message, chatRoomId } = chatInfo;

      try {
       await sendMessage(chatRoomId, chat.trim(), token);
    
        setChat('');
      } catch (error) {
        console.log(error);
      }
    }
  };


  const handleMsgClick = (messageId) => {

      
     if(selectedMessageId !==messageId){

      setSelectedMessageId(messageId);
     }
     else{
      setSelectedMessageId(null)
     }

    console.log(messageId)
  }

  const renderMessage = ({ item }) => (
    
    <TouchableOpacity onPress={() => handleMsgClick(item.id)} 
    style={[
      
      item.by === userId ? styles.messageContainerForSelf : styles.messageContainerForOthers,
      item.id === selectedMessageId && styles.highlightedMessage,
      
    ]}>
      <Text style={styles.messageText} >{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.messagesContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={chat}
          onChangeText={setChat}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatView;







const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    messagesContainer: {
      flexGrow: 1,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    messageContainerForOthers: {
      backgroundColor: '#DCF8C6',
      borderRadius: 8,
      padding: 8,
      marginBottom: 8,
      maxWidth: '75%',
      alignSelf: 'flex-start',
    },

    messageContainerForSelf: {
      backgroundColor: '#DCF8C6',
      borderRadius: 8,
      padding: 8,
      marginBottom: 8,
      maxWidth: '75%',
      alignSelf: 'flex-end',
    },

    messageText: {
      fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#eaeaea',
        padding: 8,
      },
      input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#eaeaea',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginRight: 8,
      },
      sendButton: {
        backgroundColor: '#128C7E',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
      },
      sendButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
      },
      headerButton: {
        marginRight: 16, // Adjust this value as needed
      },
      highlightedMessage: {
        backgroundColor: 'black', // or any other color you want for highlighting
      },
    });
    
