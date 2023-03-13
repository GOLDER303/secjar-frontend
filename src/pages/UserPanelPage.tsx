import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { IsLoggedInContext, IsLoggedInContextType } from "../contexts/IsLoggedInContext"
import FileEntry from "../components/FileEntry"
import { getFileSystemEntriesInfo } from "../services/FileSystemEntryInfoService"
import FileSystemEntryInfo from "../ts/interfaces/FileSystemEntryInfo"
import FileUploadCard from "../components/FileUploadCard"

const UserPanelPage: React.FC = () => {
    const { isUserLoggedIn } = React.useContext(IsLoggedInContext) as IsLoggedInContextType
    const [fileUploadCardVisible, setFileUploadCardVisible] = useState(false);
    const [fileUploadDirectory, setFileUploadDirectory] = useState<string | null>(null);
    const [fileSystemEntriesInfo, setFileSystemEntriesInfo] = React.useState<FileSystemEntryInfo[]>([])

    useEffect(() => {
        getFileSystemEntriesInfo().then((getFileSystemEntriesInfoResponse) => {
            if (getFileSystemEntriesInfoResponse.error) {
                //TODO: handle error
            }
            if (getFileSystemEntriesInfoResponse.data) {
                setFileSystemEntriesInfo(getFileSystemEntriesInfoResponse.data)
            }
        })
    }, [])

    return (
        <div>
            <h1>User Panel Page</h1>
            {isUserLoggedIn ? (
                <div>
                    <table>
                        <tr>
                            <th>Nazwa pliku</th>
                            <th>Typ</th>
                            <th>Właściciel</th>
                            <th>Rozmiar</th>
                        </tr>
                        {fileSystemEntriesInfo.map((fileSystemEntryInfo) => {
                            return <FileEntry
                                key={fileSystemEntryInfo.id}
                                fileSystemEntryInfo={fileSystemEntryInfo}
                                setFileUploadCardVisible={(isVisible : boolean) => {setFileUploadCardVisible(isVisible)}}
                                setFileUploadDirectory={(directory : string) => {setFileUploadDirectory(directory)}}
                            />
                        })}
                    </table>
                    <button onClick={() => {
                        setFileUploadCardVisible(true);
                        setFileUploadDirectory(null);
                    }}>
                        Upload to root
                    </button>
                    {fileUploadCardVisible ? (
                        <FileUploadCard
                            uuid={fileUploadDirectory}
                            setFileUploadCardVisible={(isVisible: boolean) => {setFileUploadCardVisible(isVisible)}}
                        />
                    ) : ("")}
                </div>
            ) : (
                <h2>
                    You need to <Link to={"/login"}>login</Link> first
                </h2>
            )}
        </div>
    )
}

export default UserPanelPage
