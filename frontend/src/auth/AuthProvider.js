import { useState, useContext } from "react";

import AuthContext from "./AuthContext";

export const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState()

    // put code to see if user is logged in here (from localStorage)
    // useEffect(() => {
    //     const currentUser = getUser()
    //     setUser(currentUser)
    // }, [])
    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    )
}