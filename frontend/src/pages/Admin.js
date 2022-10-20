import { Link } from "react-router-dom"
import { useUser } from "../auth/useUser"
import NavBar from "../components/NavBar"

const Admin = () => {
    const user = useUser()

    return(
        <>
        { user && user.isAdmin 
        ? 
        <h2>Welcome to the admin view, {user.firstName} </h2 > 
        : 
        <><h2>Not authorized</h2>
        <Link to='/'>Back Home</Link></>}
        </>
    )
}

export default Admin