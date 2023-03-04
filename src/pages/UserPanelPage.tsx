import React from "react"
import { Link } from "react-router-dom"
import { IsLoggedInContext, IsLoggedInContextType } from "../contexts/IsLoggedInContext"

const UserPanelPage: React.FC = () => {
    const { isUserLoggedIn } = React.useContext(IsLoggedInContext) as IsLoggedInContextType
    return (
        <>
            <h1>User Panel Page</h1>
            {isUserLoggedIn ? <h2>Hello</h2> : <h2>You need to <Link to={"/login"}>login</Link> first</h2>}
        </>
    )
}

export default UserPanelPage
