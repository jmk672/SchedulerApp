import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useToken } from '../auth/useToken'



const Login = () => {

    const [username, setUsername] = useState('')
    const [error, setError] = useState('')
    const [, setToken] = useToken()

    const navigate = useNavigate()

    const submit = async () => {
        
        try {
            const res = await axios.post('http://localhost:4000/auth/login', {"id": username})
            const { token } = res.data
   
            setToken(token)
            navigate('/')
        } catch (err) {
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