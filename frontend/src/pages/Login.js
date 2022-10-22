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


    const submit = async () => {
        
        try {
            const res = await axios.post(api + '/auth/login', {"id": username})
            const { token } = res.data
   
            setToken(token)
            console.log(token)
            navigate('/instructor/home')
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
        }
    }

    return(
        <div className = "container">
            <div className = "row">
                {/* <div className = "col-md-4"/> */}
                <div className = "col-md-4">
                    {error && 
                        <div className="alert alert-danger alert-dismissible fade show m-1" role="alert">
                            {error}
                            {<button type="button" className="btn-close m-0" aria-label="Close" onClick={()=>{setError('')}}></button>}
                        </div>}
                    <input className="form-control my-1 mx-1" placeholder="user name" value={username} onChange={e => setUsername(e.target.value)}/>
                    <button disabled={!username} className="btn btn-primary m-1" onClick={()=> submit(username)} >Log in</button>
                </div>
                {/* <div className = "col-md-4"/> */}
            </div>
        </div>
    )
}




export default Login