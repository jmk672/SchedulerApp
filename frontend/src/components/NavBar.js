import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import useAuthContext from '../auth/useAuthContext'


const NavBar = () => {
    const {user, token, setToken} = useAuthContext()
    const navigate = useNavigate()
    
    const logOut = async () => {
        try {
            const res = await axios.post('http://localhost:4000/auth/logout/', {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(res.status)
            navigate('/login')
        } catch (err) {
        }
        setToken(null)
    }
    return (
        <nav className="navbar navbar-expand-sm bg-light d-flex p-2">

                <div className="navbar-brand">101 McAllister Scheduler</div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                        { user && user.courses[0] && <div className='nav-item'><Link to='/instructor/home' className="nav-link">Instructor View</Link></div>}
                        { user && user.isAdmin && <div className='nav-item'><Link to='/admin/users' className="nav-link" >Administrator View</Link></div>}
                    </div>
                    {user && <div className='nav-item'><button className="btn btn-outline-primary me-2" onClick={logOut}>Log Out</button></div>}
                    
                </div>
        </nav>
    )
}

export default NavBar;
