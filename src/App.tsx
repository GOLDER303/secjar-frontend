import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AccountActivationPage from "./pages/AccountActivationPage"
import LoginPage from "./pages/LoginPage"
import PasswordResetPage from "./pages/PasswordResetPage"
import RootPage from "./pages/RootPage"
import SupportPage from "./pages/SupportPage"
import UserPanelPage from "./pages/UserPanelPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage />,
        children: [
            {
                path: "/home",
                element: <UserPanelPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
        ],
    },
    {
        path: "/support",
        element: <SupportPage />,
    },
    {
        path: "/passwordReset",
        element: <PasswordResetPage />,
    },
    {
        path: "/activateAccount",
        element: <AccountActivationPage />,
    },
])

const App: React.FC = () => {
    return <RouterProvider router={router} />
}

export default App
