import useAuthContext from "../auth/useAuthContext"
import { useState, useEffect } from "react"
import axios from "axios"
import api from "../api"
import _ from 'lodash'
import {VscAdd} from 'react-icons/vsc'


const EditCourses = () => {
    const { token } = useAuthContext()
    const [error, setError] = useState()
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
        else setActiveUserObject(null)
    },[activeUser, data]
    )
    const submit = (e) => {

    }
    return (
        <div className="mt-4 mx-2 col-xl-6 col-lg-7 col-md-8">
             {error && 
                <div className="alert alert-danger alert-dismissible fade show m-1" role="alert">
                    {error}
                    {<button type="button" className="btn-close m-0" aria-label="Close" onClick={()=>{setError('')}}></button>}
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
                    <label>The Active User is: {activeUserObject && activeUserObject.firstName} {activeUserObject && activeUserObject.lastName}</label>

                    { activeUserObject && activeUserObject.courses[0] && activeUserObject.courses.map((c, i) => (
                        <div className="row" key={i}> 
                            <div className="col-md-6"><label>Course Number</label><input value={c.courseNumber} 
                                onChange={(e)=>{ 
                                    let temp = activeUserObject.courses
                                    temp[i].courseNumber = e.target.value
                                    setActiveUserObject({ courses: temp })}}/>
                            </div> 
                            <div className="col-md-6"><label>Section Number</label><input value={c.sectionNumber}
                                onChange={(e)=>{ 
                                    let temp = activeUserObject.courses
                                    temp[i].sectionNumber = e.target.value
                                    setActiveUserObject({ courses: temp })}}/>
                            </div>
                        </div>
                    )) }
                </div>
                <button disabled={!activeUser} type="button" className="btn btn-outline-primary m-2" 
                    onClick={()=>{
                        setActiveUserObject({ courses: activeUserObject.courses.concat([{courseNumber: null, sectionNumber: null}]) })}}>
                        <VscAdd/></button>
                        <button disabled={!activeUser} type="submit" className="btn btn-primary btn-block m-1">Update</button>
            </form>
        </div>
    )
}

export default EditCourses