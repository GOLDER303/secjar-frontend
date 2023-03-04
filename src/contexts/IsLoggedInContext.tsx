import React from "react"

export type IsLoggedInContextType = {
    isUserLoggedIn: boolean
    setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const IsLoggedInContext = React.createContext<IsLoggedInContextType | null>(null)

interface IsLoggedInProviderProps {
    children: React.ReactNode
}

const IsLoggedInProvider: React.FC<IsLoggedInProviderProps> = ({ children }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = React.useState<boolean>(false)

    return <IsLoggedInContext.Provider value={{ isUserLoggedIn: isUserLoggedIn, setIsUserLoggedIn: setIsUserLoggedIn }}>{children}</IsLoggedInContext.Provider>
}

export default IsLoggedInProvider
