import { useEffect, useState } from "react"
import useAuthContext from "../auth/useAuthContext"
import axios from "axios"
import api from "../api"
import _ from 'lodash'
import { VscTrash } from 'react-icons/vsc'


const Admin = () => {
    const { user, token } = useAuthContext()
    const [error, setError] = useState()
    const [data, setData] = useState()

    useEffect( () => {
        const fetch = async () => {
        try {
            const res = await axios.get(api + '/users/',
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            setData(_.sortBy(res.data,['lastName', 'firstName']))
        } catch (err) {
            setError(err.response.data.message)
        }
    }
    fetch()
    },[token])

    const deleteUser = async (id) => {
        await axios.delete(api + '/users/' + id,
        {
            headers: { Authorization: `Bearer ${token}` }
        })
        setError(`User ${id} deleted`)
        setData(data.filter(user => user.id !== id))
    }

    return(
        <div className="container mx-2 my-4">
            {error && 
                <div className="alert alert-danger alert-dismissible fade show my-1" role="alert">
                    {error}
                    {<button type="button" className="btn-close m-0" aria-label="Close" onClick={()=>{setError('')}}></button>}
                </div>}
            <ul className="list-group">
                <li className="list-group-item d-flex border-bottom border-3" key="legend">
                    <div className="col-5">Name</div>
                    <div className="col-6">Courses</div>
                    <div className="col-1">Delete</div>
                </li>
                {data && data.map((listuser) => (
                <li className="list-group-item d-flex" key={listuser._id}>
                    <div className="col-5">{listuser.firstName} {listuser.lastName}{listuser.isAdmin && ', administrator'}</div>
                    <div className="col-6">{listuser.courses && listuser.courses.map((course) => (
                    <div key={course._id}>Math {course.courseNumber} </div>))}</div>
                    <div className="col-1">{user.id !== listuser.id && <button type="button" className="btn btn-outline-danger" onClick={()=>deleteUser(listuser.id)}><VscTrash/></button>}</div>
                </li>
                ))}
            </ul>
            <div className="alert alert-warning my-2" role="alert">Note: Deleting a user will not delete any exams or appointments</div>
        </div>
    )
}

export default Admin