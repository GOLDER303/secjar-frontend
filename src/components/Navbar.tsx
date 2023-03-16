import React from "react"
import { Link, useNavigate} from "react-router-dom"
import { IsLoggedInContext, IsLoggedInContextType } from "../contexts/IsLoggedInContext"
import { logout } from "../services/AuthService"
import jwt_decode from "jwt-decode"

const Navbar: React.FC = () => {
    const { isUserLoggedIn, setIsUserLoggedIn } = React.useContext(IsLoggedInContext) as IsLoggedInContextType

    const navigate = useNavigate()

    const logoutHandler = () => {
        logout()
        setIsUserLoggedIn(false)
        navigate("/login")
    }

    const hasAdminRole = () => {
        const token = localStorage.getItem("jwt")
        if (token){
            const decodedJwt = jwt_decode(token) as {scope: string}
            if (decodedJwt.scope.includes("ROLE_ADMIN")){
                return true
            }
        }
        return false
    }

    return (
        <nav className="site-bar">
            <ul>
                <li>
                    <Link to={"/home"}>Home</Link>
                </li>
                {hasAdminRole() && (
                    <li>
                        <Link to={"/adminPanel"}>Admin panel</Link>
                    </li>
                )}
                <li>{isUserLoggedIn ? <button onClick={logoutHandler}>Logout</button> : <Link to={"/login"}>Login</Link>}</li>
            </ul>
        </nav>
    )
}

export default Navbar
