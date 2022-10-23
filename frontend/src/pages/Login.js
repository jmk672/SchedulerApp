import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import useAuthContext from '../auth/useAuthContext'



const Login = () => {

    const [username, setUsername] = useState('')
    const [error, setError] = useState('')

    const { user, setToken } = useAuthContext()
    const navigate = useNavigate()

    useEffect( () => {
        if (user) navigate('/instructor/home')},[navigate, user]
    )


    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(api + '/auth/login', {"id": username})
            const { token } = res.data
   
            setToken(token)
            navigate('/instructor/home')
        } catch (err) {
            setError(err.response.data.message)
        }
    }

    return(
        <div className="row">
            <div className="col-md-1"/>
            <div className="mt-4 mx-2 col-md-3">
                <form onSubmit={e => submit(e)}>
                    <div className="row mb-2">
                        {error && 
                            <div className="alert alert-danger alert-dismissible fade show m-1" role="alert">
                                {error}
                                {<button type="button" className="btn-close m-0" aria-label="Close" onClick={()=>{setError('')}}></button>}
                            </div>}
                        <div className="form-outline">
                            <input className="form-control" placeholder="user name" value={username} onChange={e => setUsername(e.target.value)}/>
                        </div>
                        </div>
                        <button disabled={!username} type="submit" className="btn btn-primary btn-block mb-4" >Log in</button>
                    {/* <div className = "col-md-4"/> */}
                </form>
            </div>
        </div>
    )
}




export default Login