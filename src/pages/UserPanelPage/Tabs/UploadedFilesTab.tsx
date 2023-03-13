import React from "react"
import { useEffect } from "react"
import FileSystemEntryInfoList from "../../../components/FileSystemEntryInfoList"
import { getFileSystemEntriesInfo } from "../../../services/FileSystemEntryInfoService"
import FileSystemEntryInfoDTO from "../../../ts/interfaces/FileSystemEntryInfoDTO"

const UploadedFilesTab: React.FC = () => {
    const [fileSystemEntriesInfo, setFileSystemEntriesInfo] = React.useState<FileSystemEntryInfoDTO[]>([])

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
        <>
            <h2>Przesłane pliki</h2>
            <FileSystemEntryInfoList fileSystemEntriesInfoDTO={fileSystemEntriesInfo} />
        </>
    )
}

export default UploadedFilesTab
