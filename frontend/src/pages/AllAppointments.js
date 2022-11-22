import useAuthContext from "../auth/useAuthContext"
import { useState, useEffect } from "react"
import axios from "axios"
import _ from "lodash"
import api from "../api"
import { VscTrash } from "react-icons/vsc"

const AllAppointments = () => {
    const { token } = useAuthContext()
    const [error, setError] = useState()
    const [data, setData] = useState()

    useEffect( () => {
        const fetch = async () => {
            try {
                const res = await axios.get(api+'/appointments',
                {
                    headers: {Authorization: `Bearer ${token}` }
                })
                setData(_.sortBy(res.data, ['day', 'time']))
            } catch (err) {
                setError(err.response.data.message)
            }
        }
        fetch()
    }, [token])

    console.log(data)
    return(
        <div className="container mx-2 my-4">
            {error && 
                <div className="alert alert-danger alert-dismissible fade show my-1" role="alert">
                    {error}
                    {<button type="button" className="btn-close m-0" aria-label="Close" onClick={()=>{setError('')}}></button>}
                </div>}
                <ul className="list-group">
                <li className="list-group-item d-flex border-bottom border-3" key="legend">
                    <div className="col-4">Date and Time</div>
                    <div className="col-3">Student and Instructor</div>
                    <div className="col-3">Quiz Info</div>
                    <div className="col-2">Delete</div>
                </li>
                {data && data.map((appointment) => (
                <li className="list-group-item d-flex" key={appointment._id}>
                    <div className="col-4"><div>Date: {appointment.date}</div><div>Time: {appointment.time}</div></div>
                    <div className="col-3"><div>Student: {appointment.student}</div><div>Instructor: {appointment.instructor}</div></div>
                    <div className="col-3"><div>Exam Id: {appointment.examId}</div><div>Extra Time: {appointment.extraTime}</div></div>
                    <div className="col-2"><button type="button" className="btn btn-outline-danger" onClick={7}><VscTrash/></button></div>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default AllAppointments