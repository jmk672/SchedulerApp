import { NavLink } from 'react-router-dom'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuthContext from "../auth/useAuthContext"

const AdminNav = () => {
    const { user } = useAuthContext()

    const navigate = useNavigate()

    useEffect( ()=> {
        if(!user) navigate('/login')
        else if(!user || !user.isAdmin) navigate('/')
    }, [user, navigate])

    return(
            <nav id="adminSidebar" className='d-lg-block sidebar'>
                <div className="position-sticky">
                    <div className='list-group list-group-flush m-0'>
                    <NavLink id="users" className='list-group-item list-group-item-action py-2'  to="/admin/users"><span>All Users</span></NavLink>
                    <NavLink id="addUser" className='list-group-item list-group-item-action py-2'  to="/admin/addUser"><span>Add User</span></NavLink>
                    <NavLink id="addUser" className='list-group-item list-group-item-action py-2'  to="/admin/editCourses"><span>Edit User's Courses</span></NavLink>
                    <NavLink id="addExam" className='list-group-item list-group-item-action py-2'  to="/admin/addExam"><span>Add New Exam</span></NavLink>
                    <NavLink id="schedule" className='list-group-item list-group-item-action py-2'  to="/admin/schedule"><span>Schedule Makeup</span></NavLink>
                    </div>
                </div>
            </nav>
    )
}

export default AdminNav