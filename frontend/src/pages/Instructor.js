import { useUser } from "../auth/useUser"
import NavBar from "../components/NavBar"


const Instructor = () => {
    const user = useUser()

    return(
        <>
        {user ? <NavBar/> : <div/>}
        <h2>Welcome to the instructor view, Professor { user.lastName }</h2>
        </>
    )
}

export default Instructor