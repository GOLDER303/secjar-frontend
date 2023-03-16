import React, { useEffect } from "react"
import DirectoryNameSetCard from "../../../components/DirectoryNameSetCard"
import FileMovePopup from "../../../components/FileActionsPopups/FileMovePopup"
import FileUploadPopup from "../../../components/FileActionsPopups/FileUploadPopup"
import FileSystemEntryInfoList from "../../../components/FileSystemEntryInfoList"
import { getFileSystemEntriesInfo } from "../../../services/FileSystemEntryInfoService"
import FileSystemEntryInfoDTO from "../../../ts/interfaces/FileSystemEntryInfoDTO"

const UploadedFilesTab: React.FC = () => {
    const [fileSystemEntriesInfo, setFileSystemEntriesInfo] = React.useState<FileSystemEntryInfoDTO[]>([])

    const [isFileUploadPopupVisible, setIsFileUploadPopupVisible] = React.useState(false)
    const [isFileMovePopupVisible, setIsFileMovePopupVisible] = React.useState(false)

    const [directoryCreateCardVisible, setDirectoryCreateCardVisible] = React.useState(false)

    const [fileUploadDirectory, setFileUploadDirectory] = React.useState<string | undefined>(undefined)
    const [targetFileUuid, setTargetFileUuid] = React.useState("")

    useEffect(() => {
        refreshFileSystemEntriesInfo()
    }, [])

    const refreshFileSystemEntriesInfo = async () => {
        const response = await getFileSystemEntriesInfo()
        if (response.error) {
            //TODO: handle error
        }
        if (response.data) {
            setFileSystemEntriesInfo(
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

    const closeFileUploadPopup = () => {
        setIsFileUploadPopupVisible(false)
    }

    const openFileUploadPopup = () => {
        setIsFileUploadPopupVisible(true)
    }

    const closeFileMovePopup = () => {
        setIsFileMovePopupVisible(false)
    }

    const openFileMovePopup = (targetFileUuid: string) => {
        setTargetFileUuid(targetFileUuid)
        setIsFileMovePopupVisible(true)
    }

    return (
        <>
            <h2>Przesłane pliki</h2>
            <FileSystemEntryInfoList
                fileSystemEntriesInfoDTO={fileSystemEntriesInfo.filter((fileSystemEntryInfo) => fileSystemEntryInfo.deleteDate == null)}
                openFileUploadPopup={openFileUploadPopup}
                openFileMovePopup={openFileMovePopup}
                setFileUploadDirectory={setFileUploadDirectory}
                refreshFileSystemEntriesInfos={refreshFileSystemEntriesInfo}
            />
            <button
                onClick={() => {
                    setFileUploadDirectory(undefined)
                    openFileUploadPopup()
                }}
            >
                Upload to root
            </button>
            <button onClick={() => setDirectoryCreateCardVisible(true)}>Create directories</button>

            {isFileUploadPopupVisible && (
                <FileUploadPopup
                    targetDirUuid={fileUploadDirectory}
                    fileUploadCallback={refreshFileSystemEntriesInfo}
                    closePopup={closeFileUploadPopup}
                />
            )}

            {isFileMovePopupVisible && (
                <FileMovePopup
                    targetFileUuid={targetFileUuid}
                    fileSystemEntriesInfos={fileSystemEntriesInfo}
                    fileMoveCallback={refreshFileSystemEntriesInfo}
                    closePopup={closeFileMovePopup}
                />
            )}

            {directoryCreateCardVisible && (
                <DirectoryNameSetCard
                    setDirectoryCreateCardVisible={setDirectoryCreateCardVisible}
                    fileRefreshFunction={refreshFileSystemEntriesInfo}
                />
            )}
        </>
    )
}

export default UploadedFilesTab
