import { useState } from 'react'
import AuthContext from "./AuthContext";

export const AuthProvider = ({children}) => {
    
    const getPayloadFromToken = token => {
        if(!token) return {}
        const encodedPayload = token.split('.')[1]
        return JSON.parse(atob(encodedPayload))
    }
    
    // formerly useToken
    const [token, setTokenInternal] = useState(() => {
        if (localStorage.getItem('token')) {
            const newUser = getPayloadFromToken(localStorage.getItem('token'))
            if (Date.now()/1000 > newUser.exp) localStorage.removeItem('token')
        }
        return localStorage.getItem('token');
    })

    const setToken = newToken => {
        if (!newToken) localStorage.removeItem('token')
            else localStorage.setItem('token', newToken)
        setTokenInternal(newToken)

        
        if (newToken) {
            const newUser = getPayloadFromToken(newToken)
            if (Date.now()/1000 > newUser.exp) localStorage.removeItem('token')
            else setUser(newUser)}
        if (!newToken) setUser(null)
    }



    // formerly useUser
    const [user, setUser] = useState(() => {
        if (!token) return null
        return getPayloadFromToken(token)
    })

    // useEffect(() => {
    //     if (!token) setUser(null)
    //     if (token) setUser(getPayloadFromToken(token))
    // }, [token])

    // put code to see if user is logged in here (from localStorage)
    // useEffect(() => {
    //     const currentUser = getUser()
    //     setUser(currentUser)
    // }, [])

    const value = {user, token, setToken}
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}