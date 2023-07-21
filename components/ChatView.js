import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { retrieveOldMessages, sendMessage } from '../api/chatRoom'; // Import the API functions
import { useSocket } from './SocketContext'; // Import the socket context

const ChatView = ({route,token,userId}) => {
  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatInfo, setChatInfo] = useState(null);
  const [isNewChatRoom, setIsNewChatRoom] = useState(false);

  const socket = useSocket();
  

  useEffect(() => {
    
    const { chatRoomInfo } = route.params;
    const chatInfo = chatRoomInfo.chatRoom;

  
    setChatInfo(chatInfo);
    setIsNewChatRoom(chatInfo.isNew);

    socket.on('connect', handleSocketConnect);
    socket.on('new message', handleSocketNewMessage);

    socket.emit("identity", userId)
    socket.emit("subscribe", chatInfo.chatRoomId)

    if (!chatInfo.isNew) {
      retrieveOldMessagesAndSetState(chatInfo.chatRoomId, token);
    }

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleSocketConnect = () => {
    console.log('WebSocket connected');
  };

  const handleSocketNewMessage = (data) => {

    setMessages(prev=>{
      
 
      const newMsg = {
        id: data.message[0].postId,
        text: data.message[0].message.messageText
      }
      return(
        [...prev, newMsg]
      )
    })
  };

  const retrieveOldMessagesAndSetState = async (chatRoomId, token) => {

    try {
      const data = await retrieveOldMessages(chatRoomId, token);
      console.log(data.conversation);

      const conversation = data.conversation.map((conversation) => ({
        id: conversation._id,
        text: conversation.message.messageText,
      }));

      setMessages((prevMessages) => [...prevMessages, ...conversation]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async () => {
    console.log('pressed');

    socket.emit('message', { message: chat });

    if (chatInfo && chat.trim() !== '') {
      const { isNew, message, chatRoomId } = chatInfo;

      try {
        const data = await sendMessage(chatRoomId, chat.trim(), token);
        console.log(data);

        const { postId } = data.post[0];

        // setMessages((prevMessages) => [...prevMessages, { id: postId, text: chat }]);
        setChat('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
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
    messageContainer: {
      backgroundColor: '#DCF8C6',
      borderRadius: 8,
      padding: 8,
      marginBottom: 8,
      maxWidth: '75%',
      alignSelf: 'flex-start',
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
    });
    
