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
        if (user) navigate('/')},[navigate, user]
    )

    const submit = async () => {
        
        try {
            const res = await axios.post(api + '/auth/login', {"id": username})
            const { token } = res.data
   
            setToken(token)
            console.log(token)
            navigate('/')
        } catch (err) {
            console.log(err)
            setError(err.response.data.message)
        }
    }

    return(
        <>
            {error ? 
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=>{setError('')}}></button>
                </div> : <div/>}
            <input className="form-control" placeholder="user name" value={username} onChange={e => setUsername(e.target.value)}/>
            <button disabled={!username} className="btn btn-primary" onClick={()=> submit(username)} >Log in</button>
        </>
    )
}




export default Login