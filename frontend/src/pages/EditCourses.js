import useAuthContext from "../auth/useAuthContext"
import { useState, useEffect } from "react"
import axios from "axios"
import api from "../api"
import _ from 'lodash'
import {VscAdd} from 'react-icons/vsc'


const EditCourses = () => {
    const { token } = useAuthContext()
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [data, setData] = useState()
    const [activeUser, setActiveUser] = useState()
    const [activeUserObject, setActiveUserObject] = useState()

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

    useEffect( ()=> {
        if (activeUser) {
           setActiveUserObject(data.find(u => u.id===activeUser))
        }
        else setActiveUserObject(undefined)
    },[activeUser, data]
    )
    const submit = async (e) => {
        e.preventDefault()
        try {

            const courseArray = activeUserObject.courses.filter( (course) => (course.courseNumber))
            const res = await axios.patch(api + '/users/' + activeUser,
            { courses: courseArray },
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            
            setActiveUser('')
            const tempdata = data.map((u, i) => {
                if (u.id===activeUser) {
                    const {courses, ...rest} = u
                    return {courses: courseArray, ...rest}}
                return u
            }
            )
            setData(tempdata)
            console.log(res)
            setSuccess(`Updated user ${res.data.id}`)
        }
        catch (err) {
            console.log(err)
            setError(err.message)
        }

        
    }
    return (
        <div className="row">
        <div className="col-md-1"/>
        <div className="mt-4 mx-2 col-md-4">
             {error && 
                <div className="alert alert-danger alert-dismissible fade show my-1" role="alert">
                    {error}
                    {<button type="button" className="btn-close m-0" aria-label="Close" onClick={()=>{setError('')}}></button>}
                </div>}
            {success && 
                <div className="alert alert-success alert-dismissible fade show my-1" role="alert">
                    {success}
                    {<button type="button" className="btn-close m-0" aria-label="Close" onClick={()=>{setSuccess('')}}></button>}
                </div>}
            <form onSubmit={e => submit(e)}>
                <div className="form-group">
                    <label> User </label>
                    <select className="form-control" value={activeUser} onChange={e => setActiveUser(e.target.value)}>
                            <option value=''></option>
                        {data && data.map((listuser) => (
                            <option key={listuser.id} value={listuser.id} >
                                {listuser.lastName}, {listuser.firstName} ({listuser.id})
                            </option>
                        ))}
                    </select>
                    {/* <label>The Active User is: {activeUserObject && activeUserObject.firstName} {activeUserObject && activeUserObject.lastName}</label> */}

                    { activeUserObject && activeUserObject.courses[0] && activeUserObject.courses.map((c, i) => (
                        <div className="row" key={i}> 
                            <div className="col-md-6"><label className="form-label mb-0 mt-1">Course Number</label><input className="form-control" value={c.courseNumber} 
                                onChange={(e)=>{ 
                                    let temp = activeUserObject.courses
                                    temp[i].courseNumber = e.target.value
                                    setActiveUserObject({ courses: temp })}}/>
                            </div> 
                        </div>
                    )) }
                </div>
                <button disabled={!activeUser} type="button" className="btn btn-outline-primary my-2 me-2" 
                    onClick={()=>{
                        setActiveUserObject({ courses: activeUserObject.courses.concat([{courseNumber: ''}]) })}}>
                        <VscAdd/></button>
                        <button disabled={!activeUser} type="submit" className="btn btn-primary btn-block my-1">Update</button>
            </form>
        </div>
        </div>
    )
}

export default EditCourses