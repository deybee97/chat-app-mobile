

import { useContext, useEffect, createContext, useState} from "react";
import login from "../api/login";
import signup from "../api/signup";

const AuthContext = createContext()


export const useAuth = () => {
    return useContext(AuthContext)
}


export const AuthProvider = ({children}) => {
  
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)


    const loginUser = async(username, password) => {

        const {authorization, userId} =  await login(username, password)
        setToken(authorization)
        setUserId(userId)
        localStorage.setItem("token", authorization)
        localStorage.setItem("userId", userId)


    }

    const logoutUser = () => {
        setToken(null)
        setUserId(null)
        localStorage.clear()
    }

    const signUpUser = async(username, password, firstName, lastName) => {

        const {authorization, userId} = await signup(username, password, firstName, lastName)

        setToken(authorization)
        setUserId(userId)
        localStorage.setItem("token", authorization)
        localStorage.setItem("userId", userId)

        
    }

    

    useEffect(()=>{

        setToken(localStorage.token)
        setUserId(localStorage.userId)
        setLoading(false)
    },[token, userId])

    const value = {
       token,
       userId,
       loginUser,
       signUpUser,
       logoutUser

    }

    return (<AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>)
}