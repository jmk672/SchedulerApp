import useAuthContext from "../auth/useAuthContext"
import { useState } from "react"
//import { useNavigate } from "react-router-dom"
import axios from "axios"
import api from "../api"

const AddUser = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [id, setId] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const { token } = useAuthContext()
//    const navigate = useNavigate()


    const submit = async (event) => {
        event.preventDefault()

        try {
            const res = await axios.post(api + '/users', 
            {
                "firstName": firstName,
                "lastName": lastName,
                "id": id,
                "isAdmin": isAdmin
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            setSuccess(`User ${firstName} ${lastName} with id: ${id} created`)
            console.log(res.status)
        } catch (err) {
            setError(err.response.data.message)
        }
    }
    

    return(
    <div className="row">
    <div className="col-md-1"/>
    <div className="mt-4 mx-2 col-md-4">
        <form onSubmit={e => submit(e)}>
            <div className="row mt-2">
                <div className="form-outline">
                    {success && 
                    <div className="alert alert-success alert-dismissible fade show my-2" role="alert">
                        {success}
                        {<button type="button" className="btn-close m-0" aria-label="Close" onClick={()=>{setSuccess('')}}></button>}
                    </div>}
                {error && 
                    <div className="alert alert-danger alert-dismissible fade show my-2" role="alert">
                        {error}
                        {<button type="button" className="btn-close m-0" aria-label="Close" onClick={()=>{setError('')}}></button>}
                    </div>}
                </div>
                <div className="col">
                <div className="form-outline">
                    <input type="text" className="form-control" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <label className="form-label" >First name</label>
                </div>
                </div>
                <div className="col">
                <div className="form-outline">
                    <input type="text"  className="form-control" value={lastName} onChange={e => setLastName(e.target.value)}/>
                    <label className="form-label">Last name</label>
                </div>
                </div>
            </div>

            <div className="form-outline mb-2">
                <input type="text" className="form-control" value={id} onChange={e => setId(e.target.value)}/>
                <label className="form-label">Id (ex. abc123)</label>
            </div>

            <div className="form-check d-flex  my-2">
                <input className="form-check-input me-2" type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(!isAdmin)} />
                <label className="form-check-label">
                Administrator User?
                </label>
            </div>


            <button disabled={!firstName || !lastName || !id} type="submit" className="btn btn-primary btn-block mb-4">Add User</button>
        </form>
    </div>
    </div>
    )
}

export default AddUser