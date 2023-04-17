import React, { useEffect } from "react"
import { getAllUserInfo } from "../services/UserManagementService"

export type UsernamesUuidsMapContextType = {
    usernamesUuidsMap: UsernameUuidMapPair | null
}

export const UsernamesUuidsMapContext = React.createContext<UsernamesUuidsMapContextType | null>(null)

interface UsernamesUuidsMapProviderProps {
    children: React.ReactNode
}

const UsernamesUuidsMapProvider: React.FC<UsernamesUuidsMapProviderProps> = ({ children }) => {
    const [usernamesUuidsMap, setUsernamesUuidsMap] = React.useState<UsernameUuidMapPair | null>(null)

    useEffect(() => {
        const fetchAllUserInfo = async () => {
            const allUsersInfosResponse = await getAllUserInfo()
            if (allUsersInfosResponse.data) {
                return allUsersInfosResponse.data
            }
        }

        fetchAllUserInfo()
            .then((data) => {
                const usernamesUuidsMap = new Map<string, string>()
                data?.map((userInfo) => {
                    usernamesUuidsMap.set(userInfo.uuid, userInfo.name)
                    usernamesUuidsMap.set(userInfo.name, userInfo.uuid)
                })

                return usernamesUuidsMap
            })
            .then((usernameUuidsMap) => setUsernamesUuidsMap(usernameUuidsMap))
    }, [])

    return <UsernamesUuidsMapContext.Provider value={{ usernamesUuidsMap }}>{children}</UsernamesUuidsMapContext.Provider>
}

export default UsernamesUuidsMapProvider
