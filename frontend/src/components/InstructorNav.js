import { NavLink, useNavigate } from 'react-router-dom'
import useAuthContext from '../auth/useAuthContext'
import { useEffect } from 'react'

const InstructorNav = () => {
    const { user } = useAuthContext()

    const navigate = useNavigate()

    useEffect( ()=> {
        if(!user) navigate('/login')
        else if(user && user.isAdmin && !user.courses[0]) navigate('/admin/home')
    }, [user, navigate])

    return(
            <nav id="adminSidebar" className='d-lg-block sidebar'>
                <div className="position-sticky">
                    <div className='list-group list-group-flush m-0'>
                    <NavLink id="home" className='list-group-item list-group-item-action py-2'  to="/admin/home"><span>Admin Home</span></NavLink>
                    <NavLink id="addUser" className='list-group-item list-group-item-action py-2'  to="/admin/addUser"><span>Add User</span></NavLink>
                    <NavLink id="addExam" className='list-group-item list-group-item-action py-2'  to="/admin/addExam"><span>Add New Exam</span></NavLink>
                    <NavLink id="schedule" className='list-group-item list-group-item-action py-2'  to="/admin/schedule"><span>Schedule Makeup</span></NavLink>
                    </div>
                </div>
            </nav>

    )
}

export default InstructorNav