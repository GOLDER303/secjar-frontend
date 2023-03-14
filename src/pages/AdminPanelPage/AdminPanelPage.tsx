import React from "react"
import { Link, Navigate, useOutlet } from "react-router-dom"
import { IsLoggedInContext, IsLoggedInContextType } from "../../contexts/IsLoggedInContext"
import "../../css/UserPanelPage.css"

const AdminPanelPage: React.FC = () => {
    const { isUserLoggedIn } = React.useContext(IsLoggedInContext) as IsLoggedInContextType

    const outlet = useOutlet()

    return (
        <div className="admin-panel-page-container">
            <h1>Admin Panel Page</h1>
            {isUserLoggedIn ? (
                <>
                    <nav>
                        <ul>
                            <li><Link to={"disk"}>Zarządzanie dyskiem</Link></li>
                            <li><Link to={"supportSubmissions"}>Zarządzanie zgłoszeniami</Link></li>
                            <li><Link to={"users"}>Zarządzanie użytkownikami</Link></li>
                            <li><Link to={"dashboard"}>Dashboard</Link></li>
                        </ul>
                    </nav>

                    {outlet || <Navigate to={"dashboard"} />}
                </>
            ) : (
                <h2>
                    You need to <Link to={"/login"}>login</Link> first
                </h2>
            )}
        </div>
    )
}

export default AdminPanelPage