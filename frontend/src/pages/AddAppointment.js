import axios from "axios"
import _ from "lodash"
import { useEffect, useState } from "react"
import api from "../api"
import useAuthContext from "../auth/useAuthContext"

const AddAppointment = () => {
    const { token } = useAuthContext()
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [data, setData] = useState()
    const [activeUser, setActiveUser] = useState()
    const [activeUserObject, setActiveUserObject] = useState()

    useEffect( () => {
        const fetch = async () => {
            try{
                const res = await axios.get(api + '/users/',
                    {
                    headers: { Authorization: `Bearer ${token}`}
                    })
                setData(_.sortBy(res.data, ['lastName', 'firstName']))
            } catch (err) {
                setError(err.response.data.message)
            }
        }
        fetch()
    }, [token])

    useEffect( ()=> {
        if (activeUser) {
           setActiveUserObject(data.find(u => u.id===activeUser))
        }
        else setActiveUserObject(undefined)
    },[activeUser, data]
    )

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
            <form onSubmit={e => e}>
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

                </div>
            </form>
        </div>
        </div>)
}

export default AddAppointment