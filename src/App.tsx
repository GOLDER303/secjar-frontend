import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import TestPage from "./pages/TestPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <TestPage />,
    },
])

const App: React.FC = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
