import { Link } from "react-router-dom"
import { useUser } from "../auth/useUser"


const Admin = () => {
    const user = useUser()

    return(
        <div className="container">
        { user && user.isAdmin 
        ? 
        <h2>Welcome to the admin view, {user.firstName} </h2 > 
        : 
        <><h2>Not authorized</h2>
        <Link to='/'>Back Home</Link></>}
        </div>
    )
}

export default Admin