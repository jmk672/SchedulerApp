import AuthContext from "./AuthContext";
import { useContext } from "react";

const useAuthContext = () => {
 const { user, token, setToken } = useContext(AuthContext);

 if (user === undefined) {
    
 throw new Error("useAuthContext can only be used inside AuthProvider");
 }
 return { user, token, setToken };
};

export default useAuthContext