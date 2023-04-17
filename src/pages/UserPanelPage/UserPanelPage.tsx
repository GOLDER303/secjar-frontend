import React, { useEffect } from "react"
import { Link, Navigate, Outlet, useOutlet } from "react-router-dom"
import { IsLoggedInContext, IsLoggedInContextType } from "../../contexts/IsLoggedInContext"
import UsernamesUuidsMapProvider from "../../contexts/UsernamesUuidsMapContext"
import "../../css/UserPanelPage.css"
import { getFileSystemEntriesInfo } from "../../services/FileSystemEntryInfoService"
import FileSystemEntryInfoDTO from "../../ts/interfaces/FileSystemEntryInfoDTO"
import jwt_decode from "jwt-decode"
import {getUserInfo} from "../../services/UserManagementService"
import {formatFileSize} from "../../utils/FormatFileSizeUtil"

export type fileSystemEntriesInfoListContextType = { fileSystemEntriesInfoList: FileSystemEntryInfoDTO[]; refreshFileSystemEntriesInfoList: () => void }

const UserPanelPage: React.FC = () => {
    const { isUserLoggedIn } = React.useContext(IsLoggedInContext) as IsLoggedInContextType

    const outlet = useOutlet()

    const [fileSystemEntriesInfoList, setFileSystemEntriesInfoList] = React.useState<FileSystemEntryInfoDTO[]>([])

    const [currentDiskSpace, setCurrentDiskSpace] = React.useState<number>(0)
    const [allowedDiskSpace, setAllowedDiskSpace] = React.useState<number>(0)
    const [currentDiskSpaceString, setCurrentDiskSpaceString] = React.useState<string>("")
    const [allowedDiskSpaceString, setAllowedDiskSpaceString] = React.useState<string>("")

    React.useEffect(() => {
        getUserDiscSpace();
    }, [])
    const getUserDiscSpace = async () => {
        const token = localStorage.getItem("jwt")
        if (!token) {
            return
        }
        const jwt = jwt_decode(token) as { userUuid: string }

        const response = await getUserInfo(jwt.userUuid) as { data: { currentDiscSpace: number, allowedDiscSpace: number } }
        const { sizeValue: currentValue, sizeUnit: currentUnit } = formatFileSize(response.data.currentDiscSpace)
        setCurrentDiskSpace(response.data.currentDiscSpace)
        setCurrentDiskSpaceString(currentValue.toString() + currentUnit)
        const { sizeValue: allowedValue, sizeUnit: allowedUnit } = formatFileSize(response.data.allowedDiscSpace)
        setAllowedDiskSpace(response.data.allowedDiscSpace)
        setAllowedDiskSpaceString(allowedValue.toString() + allowedUnit)
    }

    const refreshFileSystemEntriesInfoList = async () => {
        const response = await getFileSystemEntriesInfo()
        if (response.error) {
            //TODO: handle error
        }
        if (response.data) {
            setFileSystemEntriesInfoList(
                response.data.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (a.name < b.name) {
                        return -1
                    }
                    return 0
                })
            )
        }
        //TODO: function to load only uploaded and updated files after refresh??
    }

    useEffect(() => {
        refreshFileSystemEntriesInfoList()
    }, [])

    return (
        <div className="user-panel-page-container">
            {isUserLoggedIn ? (
                <>
                    <nav>
                        <ul>
                            <li>
                                <Link to={"uploaded"}>Przesłane pliki</Link>
                            </li>
                            <li>
                                <Link to={"favorite"}>Ulubione pliki</Link>
                            </li>
                            <li>
                                <Link to={"deleted"}>Usunięte pliki</Link>
                            </li>
                            <li>
                                <Link to={"shared"}>Udostępnione pliki</Link>
                            </li>
                            <li>
                                <Link to={"settings"}>Ustawienia</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="progress-bar">
                        <progress
                            value={currentDiskSpace}
                            max={allowedDiskSpace}
                            unitValue={currentDiskSpaceString}
                            unitMax={allowedDiskSpaceString}
                        >
                        </progress>
                    </div>
                    <div className="tab-container">
                        <UsernamesUuidsMapProvider>
                            {outlet ? <Outlet context={{ fileSystemEntriesInfoList, refreshFileSystemEntriesInfoList }} /> : <Navigate to={"uploaded"} />}
                        </UsernamesUuidsMapProvider>
                    </div>
                </>
            ) : (
                <h2>
                    You need to <Link to={"/login"}>login</Link> first
                </h2>
            )}
        </div>
    )
}

export default UserPanelPage
