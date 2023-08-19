import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Replace 'YOUR_SERVER_URL' with your actual WebSocket server URL
    const newSocket = io('http://localhost:3001');

    setSocket(newSocket);

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);



  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
