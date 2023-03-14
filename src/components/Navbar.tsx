import React from "react"
import { Link, useNavigate} from "react-router-dom"
import { IsLoggedInContext, IsLoggedInContextType } from "../contexts/IsLoggedInContext"
import { logout } from "../services/AuthService"

const Navbar: React.FC = () => {
    const { isUserLoggedIn, setIsUserLoggedIn } = React.useContext(IsLoggedInContext) as IsLoggedInContextType

    const navigate = useNavigate()

    const logoutHandler = () => {
        logout()
        setIsUserLoggedIn(false)
        navigate("/login")
    }

    return (
        <nav className="site-bar">
            <ul>
                <li>
                    <Link to={"/home"}>Home</Link>
                </li>
                <li>
                    <Link to={"/adminPanel"}>Admin panel</Link>
                </li>
                <li>{isUserLoggedIn ? <button onClick={logoutHandler}>Logout</button> : <Link to={"/login"}>Login</Link>}</li>
            </ul>
        </nav>
    )
}

export default Navbar
