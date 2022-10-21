import { Link } from "react-router-dom"
import { useUser } from "../auth/useUser"
import AdminNav from "../components/AdminNav"


const Admin = () => {
    const user = useUser()

    return(
        <div className="row">
            <AdminNav />
            <div class="col-md-9 col-lg-10">
                <div className="container">
                { user && user.isAdmin 
                ? 
                <h2>Welcome to the admin view, {user.firstName} </h2 > 
                : 
                <><h2>Not authorized</h2>
                <Link to='/'>Back Home</Link></>}
                </div>
            </div>
        </div>
    )
}

export default Admin