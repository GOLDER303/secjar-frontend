import React from "react"
import { useOutletContext } from "react-router"
import DirectoryCreatePopup from "../../../components/FileActionsPopups/DirectoryCreatePopup"
import FileMovePopup from "../../../components/FileActionsPopups/FileMovePopup"
import FileSharePopup from "../../../components/FileActionsPopups/FileSharePopup"
import FileUploadPopup from "../../../components/FileActionsPopups/FileUploadPopup"
import FileSystemEntryInfoList from "../../../components/FileSystemEntryInfoList"
import FileSystemEntryInfoDTO from "../../../ts/interfaces/FileSystemEntryInfoDTO"
import { fileSystemEntriesInfoListContextType } from "../UserPanelPage"

const UploadedFilesTab: React.FC = () => {
    const [isFileUploadPopupVisible, setIsFileUploadPopupVisible] = React.useState(false)
    const [isFileMovePopupVisible, setIsFileMovePopupVisible] = React.useState(false)
    const [isFileSharePopupVisible, setIsFileSharePopupVisible] = React.useState(false)

    const [isDirectoryCreatePopupVisible, setIsDirectoryCreatePopupVisible] = React.useState(false)

    const [fileUploadDirectory, setFileUploadDirectory] = React.useState<string | undefined>(undefined)
    const [targetFileUuid, setTargetFileUuid] = React.useState("")
    const [targetDirUuid, setTargetDirUuid] = React.useState<string | undefined>()

    const { fileSystemEntriesInfoList, refreshFileSystemEntriesInfoList } = useOutletContext<fileSystemEntriesInfoListContextType>()

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

    const closeFileSharePopup = () => {
        setIsFileSharePopupVisible(false)
    }

    const openFileSharePopup = (targetFileUuid: string) => {
        setTargetFileUuid(targetFileUuid)
        setIsFileSharePopupVisible(true)
    }

    const openDirectoryCreatePopup = (targetFileUuid?: string) => {
        setTargetDirUuid(targetFileUuid)
        setIsDirectoryCreatePopupVisible(true)
    }

    const closeDirectoryCreatePopup = () => {
        setIsDirectoryCreatePopupVisible(false)
    }

    const displayRule = (fileSystemEntryInfo: FileSystemEntryInfoDTO) => {
        return fileSystemEntryInfo.deleteDate == null
    }

    return (
        <>
            <h2>Przesłane pliki</h2>
            <FileSystemEntryInfoList
                fileSystemEntriesInfoDTO={fileSystemEntriesInfoList}
                displayRule={displayRule}
                openFileUploadPopup={openFileUploadPopup}
                openFileMovePopup={openFileMovePopup}
                openFileSharePopup={openFileSharePopup}
                openDirectoryCreatePopup={openDirectoryCreatePopup}
                setFileUploadDirectory={setFileUploadDirectory}
                refreshFileSystemEntriesInfos={refreshFileSystemEntriesInfoList}
            />
            <div style={{ display: "flex", gap: "10px" }}>
                <button
                    onClick={() => {
                        setFileUploadDirectory(undefined)
                        openFileUploadPopup()
                    }}
                >
                    Prześlij
                </button>
                <button onClick={() => openDirectoryCreatePopup()}>Stwórz folder</button>
            </div>

            {isFileUploadPopupVisible && (
                <FileUploadPopup
                    targetDirUuid={fileUploadDirectory}
                    fileUploadCallback={refreshFileSystemEntriesInfoList}
                    closePopup={closeFileUploadPopup}
                />
            )}

            {isFileMovePopupVisible && (
                <FileMovePopup
                    targetFileUuid={targetFileUuid}
                    fileSystemEntriesInfos={fileSystemEntriesInfoList.filter((fileSystemEntryInfo) => fileSystemEntryInfo.deleteDate == null)}
                    fileMoveCallback={refreshFileSystemEntriesInfoList}
                    closePopup={closeFileMovePopup}
                />
            )}

            {isFileSharePopupVisible && (
                <FileSharePopup
                    targetFileUuid={targetFileUuid}
                    closePopup={closeFileSharePopup}
                    fileShareCallback={refreshFileSystemEntriesInfoList}
                />
            )}

            {isDirectoryCreatePopupVisible && (
                <DirectoryCreatePopup
                    parenDirectoryUuid={targetDirUuid}
                    closePopup={closeDirectoryCreatePopup}
                    directoryCreateCallback={refreshFileSystemEntriesInfoList}
                />
            )}
        </>
    )
}

export default UploadedFilesTab
