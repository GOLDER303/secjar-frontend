import jwt_decode from "jwt-decode"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { IsLoggedInContext, IsLoggedInContextType } from "../contexts/IsLoggedInContext"
import "../css/Navbar.css"
import { logout } from "../services/AuthService"

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
        if (token && isUserLoggedIn) {
            const decodedJwt = jwt_decode(token) as { scope: string }
            if (decodedJwt.scope.includes("ROLE_ADMIN")) {
                return true
            }
        }
        return false
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to={"/home"}>Panel główny</Link>
                </li>
                <li>
                    <Link to={"/support"}>Pomoc Techniczna</Link>
                </li>
                {hasAdminRole() && (
                    <li>
                        <Link to={"/adminPanel"}>Admin panel</Link>
                    </li>
                )}
                <li>{isUserLoggedIn ? <button onClick={logoutHandler}>Wyloguj</button> : <Link to={"/login"}>Zaloguj</Link>}</li>
            </ul>
        </nav>
    )
}

export default Navbar
