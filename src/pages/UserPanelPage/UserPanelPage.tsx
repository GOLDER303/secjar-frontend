import React from "react"
import { Link, Navigate, useOutlet } from "react-router-dom"
import { IsLoggedInContext, IsLoggedInContextType } from "../../contexts/IsLoggedInContext"

const UserPanelPage: React.FC = () => {
    const { isUserLoggedIn } = React.useContext(IsLoggedInContext) as IsLoggedInContextType

    const outlet = useOutlet()

    return (
        <div>
            <h1>User Panel Page</h1>
            {isUserLoggedIn ? (
                <>
                    <nav>
                        <Link to={"uploaded"}>Przesłane pliki</Link>
                    </nav>

                    {outlet || <Navigate to={"uploaded"} />}
                </>
            ) : (
                <h2>
                    You need to <Link to={"/login"}>login</Link> first
                </h2>
            )}
        </div>
    )
}

export default UserPanelPage
