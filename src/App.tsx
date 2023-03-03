import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AccountActivationPage from "./pages/AccountActivationPage"
import IndexPage from "./pages/IndexPage"
import LoginPage from "./pages/LoginPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import RootPage from "./pages/RootPage"
import SupportPage from "./pages/SupportPage"
import UserPanelPage from "./pages/UserPanelPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage />,
        children: [
            {
                index: true,
                element: <IndexPage />,
            },
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
        path: "/forgotPassword",
        element: <ForgotPasswordPage />,
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
