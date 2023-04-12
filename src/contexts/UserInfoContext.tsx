import React from "react"
import UserInfoDTO from "../ts/interfaces/UserInfoDTO"

export type UserInfoContextType = {
    userInfoDTO: UserInfoDTO | null
    setUserInfoDTO: React.Dispatch<React.SetStateAction<UserInfoDTO | null>>
}

export const UserInfoContext = React.createContext<UserInfoContextType | null>(null)

interface UserInfoProviderProps {
    children: React.ReactNode
}

const UserInfoProvider: React.FC<UserInfoProviderProps> = ({ children }) => {
    const [userInfoDTO, setUserInfoDTO] = React.useState<UserInfoDTO | null>(null)

    return <UserInfoContext.Provider value={{ userInfoDTO, setUserInfoDTO }}>{children}</UserInfoContext.Provider>
}

export default UserInfoProvider
