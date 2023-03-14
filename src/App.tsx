import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import IsLoggedInProvider from "./contexts/IsLoggedInContext"
import AccountActivationPage from "./pages/AccountActivationPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import IndexPage from "./pages/IndexPage"
import LoginPage from "./pages/LoginPage/LoginPage"
import RootPage from "./pages/RootPage"
import SupportPage from "./pages/SupportPage"
import UploadedFilesTab from "./pages/UserPanelPage/Tabs/UploadedFilesTab"
import UserPanelPage from "./pages/UserPanelPage/UserPanelPage"
import AdminPanelPage from "./pages/AdminPanelPage/AdminPanelPage";
import DiskManagmentTab from "./pages/AdminPanelPage/Tabs/DiskManagmentTab";
import SubmissionManagementTab from "./pages/AdminPanelPage/Tabs/SubmissionManagmentTab";
import UserManagementTab from "./pages/AdminPanelPage/Tabs/UserManagementTab";
import DashboardTab from "./pages/AdminPanelPage/Tabs/DashboardTab";

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
                        element: <DiskManagmentTab />,
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
