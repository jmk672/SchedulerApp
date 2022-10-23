import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuthContext from "../auth/useAuthContext"



const Instructor = () => {
    const { user } = useAuthContext()
    const navigate = useNavigate()
    useEffect(()=> {
        if (!user) navigate('/login')
        if (user && !user.courses[0] && user.isAdmin) navigate('/admin/users')
    },[user, navigate])    

    return(
        <div className='container'>
            <h2>Welcome to the instructor view, Professor {user && user.lastName }</h2>
        </div>
    )
}

export default Instructor