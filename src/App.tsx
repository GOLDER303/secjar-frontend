import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import IsLoggedInProvider from "./contexts/IsLoggedInContext"
import AccountActivationPage from "./pages/AccountActivationPage"
import AdminPanelPage from "./pages/AdminPanelPage/AdminPanelPage"
import DashboardTab from "./pages/AdminPanelPage/Tabs/DashboardTab"
import DiskManagementTab from "./pages/AdminPanelPage/Tabs/DiskManagementTab"
import SubmissionManagementTab from "./pages/AdminPanelPage/Tabs/SubmissionManagementTab"
import UserManagementTab from "./pages/AdminPanelPage/Tabs/UserManagementTab"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import IndexPage from "./pages/IndexPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import RootPage from "./pages/RootPage"
import SupportPage from "./pages/SupportPage"
import DeletedFilesTab from "./pages/UserPanelPage/Tabs/DeletedFilesTab"
import FavoriteFilesTab from "./pages/UserPanelPage/Tabs/FavoriteFilesTab"
import SharedFilesTab from "./pages/UserPanelPage/Tabs/SharedFilesTab"
import UploadedFilesTab from "./pages/UserPanelPage/Tabs/UploadedFilesTab"
import UserPanelPage from "./pages/UserPanelPage/UserPanelPage"

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
                children: [
                    {
                        path: "uploaded",
                        element: <UploadedFilesTab />,
                    },
                    {
                        path: "favorite",
                        element: <FavoriteFilesTab />,
                    },
                    {
                        path: "deleted",
                        element: <DeletedFilesTab />,
                    },
                    {
                        path: "shared",
                        element: <SharedFilesTab />,
                    },
                ],
            },
            {
                path: "/adminPanel",
                element: <AdminPanelPage />,
                children: [
                    {
                        path: "dashboard",
                        element: <DashboardTab />,
                    },
                    {
                        path: "disk",
                        element: <DiskManagementTab />,
                    },
                    {
                        path: "supportSubmissions",
                        element: <SubmissionManagementTab />,
                    },
                    {
                        path: "users",
                        element: <UserManagementTab />,
                    },
                ],
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
    return (
        <IsLoggedInProvider>
            <RouterProvider router={router} />
        </IsLoggedInProvider>
    )
}

export default App
