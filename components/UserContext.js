

import { useContext, useEffect, createContext, useState} from "react";
import login from "../api/login";

const AuthContext = createContext()


export const useAuth = () => {
    return useContext(AuthContext)
}


export const AuthProvider = ({children}) => {
  
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const loginUser = async(username, password) => {

        const [authorization, userId] =  await login(username, password)
        setToken(authorization)
        setUserId(userId)
    }

    const value = {
       token,
       userId,
       loginUser

    }

    return <AuthContext value={value}>{children}</AuthContext>
}