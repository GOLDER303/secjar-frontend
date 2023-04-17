import React, {useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { deleteFile, downloadFileSystemEntry, patchFile, restoreFileSystemEntry } from "../services/FileSystemEntryInfoService"
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO"
import FileSystemEntryInfo from "./FileSystemEntryInfo"
import "../css/FileSystemEntryInfo.css"

interface FileSystemEntryInfoListProps {
    fileSystemEntriesInfoDTO: FileSystemEntryInfoDTO[]
    openFileUploadPopup?: () => void
    openFileMovePopup?: (targetFileUuid: string) => void
    openFileSharePopup?: (targetFileUuid: string) => void
    openDirectoryCreatePopup?: (targetDirUuid: string) => void
    setFileUploadDirectory?: (param: string) => void
    refreshFileSystemEntriesInfos: () => void
}

const FileSystemEntryInfoList: React.FC<FileSystemEntryInfoListProps> = ({ fileSystemEntriesInfoDTO, openFileUploadPopup, openFileMovePopup, openFileSharePopup, openDirectoryCreatePopup, setFileUploadDirectory, refreshFileSystemEntriesInfos }) => {
    const navigate = useNavigate()
    const [thisClassName, setThisClassName] = React.useState("")
    const [directoryPath, setDirectoryPath] = React.useState<Array<string>>([])
    const [requestDirectoryPath, setRequestDirectoryPath] = React.useState<string>("")

    useEffect(() => {
        if (requestDirectoryPath[0] != "~"){
            if (requestDirectoryPath != "") {
                setDirectoryPath([...directoryPath, requestDirectoryPath])
            }
        }else{
            let newArr = directoryPath.slice(0, -1);
            setDirectoryPath([...newArr])
        }
    }, [requestDirectoryPath])

    const handleFileDelete = async (fileUuid: string, instantDelete: boolean) => {
        const response = await deleteFile(fileUuid, instantDelete)
        refreshFileSystemEntriesInfos()
    }

    const handleFileFavoriteToggle = async (fileUuid: string, isFavorite: boolean) => {
        const response = await patchFile(fileUuid, !isFavorite)
        refreshFileSystemEntriesInfos()
    }

    const handleFileSystemEntryDownload = async (fileSystemEntryUuid: string, fileName: string, fileExtension: string) => {
        downloadFileSystemEntry(fileSystemEntryUuid, fileName, fileExtension)
    }

    const handleFileSystemEntryRestore = async (fileSystemEntryUuid: string) => {
        const response = await restoreFileSystemEntry(fileSystemEntryUuid)

        if (response.error == 401) {
            navigate("/login")
        }
        refreshFileSystemEntriesInfos()
    }

    return (
        <>
            <div className="directory-path">
                You're at: <div>root</div>
                {directoryPath.map((value) => {
                    return <>{" -> "}<div>{value}</div></>
                })}
            </div>
            <table className="directory-list">
                <tr>
                    <th className="empty-cell" />
                    <th>Nazwa pliku</th>
                    <th>Typ</th>
                    <th>Właściciel</th>
                    <th>Rozmiar</th>
                    <th>Data przesłania</th>
                    <th>Ulubiony</th>
                    <th>Akcje</th>
                </tr>
                {fileSystemEntriesInfoDTO.map((fileSystemEntryInfoDTO) => {
                    return (
                        <FileSystemEntryInfo
                            fileSystemEntryInfoDTO={fileSystemEntryInfoDTO}
                            openFileInputPopup={openFileUploadPopup}
                            openFileMovePopup={openFileMovePopup}
                            openFileSharePopup={openFileSharePopup}
                            openDirectoryCreatePopup={openDirectoryCreatePopup}
                            setFileUploadDirectory={setFileUploadDirectory}
                            handleFileDelete={handleFileDelete}
                            handleFileFavoriteToggle={handleFileFavoriteToggle}
                            handleFileSystemEntryDownload={handleFileSystemEntryDownload}
                            handleFileSystemEntryRestore={handleFileSystemEntryRestore}
                            currentClassName={thisClassName}
                            setParentDirectoryClassNameCallback={setThisClassName}
                            setDirectoryPathCallback={setRequestDirectoryPath}
                        />
                    )
                })}
            </table>
        </>
    )
}

export default FileSystemEntryInfoList
