import { Link } from "react-router-dom"

const NotFound = () => {
    return(
        <div>
            <h2>Something went wrong!</h2 >
            <Link to='/login'>Go home / log in?</Link>
        </div>
    )
}

export default NotFound