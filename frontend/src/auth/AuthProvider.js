import { useState } from 'react'
import AuthContext from "./AuthContext";

export const AuthProvider = ({children}) => {

    // formerly useToken
    const [token, setTokenInternal] = useState(() => {
        return localStorage.getItem('token');
    })

    const setToken = newToken => {
        if (!newToken) localStorage.removeItem('token')
            else localStorage.setItem('token', newToken)
        setTokenInternal(newToken)
        console.log('new token', newToken)

        
        if (newToken) {
            const newUser = getPayloadFromToken(newToken)
            if (Date.now()/1000 > newUser.exp) localStorage.removeItem('token')
            else setUser(newUser)}
        if (!newToken) setUser(null)
    }

    const getPayloadFromToken = token => {
        if(!token) return {}
        const encodedPayload = token.split('.')[1]
        return JSON.parse(atob(encodedPayload))
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