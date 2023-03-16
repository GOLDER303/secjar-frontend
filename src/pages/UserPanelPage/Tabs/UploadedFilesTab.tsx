import React from "react"
import { useOutletContext } from "react-router"
import DirectoryNameSetCard from "../../../components/DirectoryNameSetCard"
import FileMovePopup from "../../../components/FileActionsPopups/FileMovePopup"
import FileUploadPopup from "../../../components/FileActionsPopups/FileUploadPopup"
import FileSystemEntryInfoList from "../../../components/FileSystemEntryInfoList"
import { fileSystemEntriesInfoListContextType } from "../UserPanelPage"

const UploadedFilesTab: React.FC = () => {
    const [isFileUploadPopupVisible, setIsFileUploadPopupVisible] = React.useState(false)
    const [isFileMovePopupVisible, setIsFileMovePopupVisible] = React.useState(false)

    const [directoryCreateCardVisible, setDirectoryCreateCardVisible] = React.useState(false)

    const [fileUploadDirectory, setFileUploadDirectory] = React.useState<string | undefined>(undefined)
    const [targetFileUuid, setTargetFileUuid] = React.useState("")

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

    return (
        <>
            <h2>Przesłane pliki</h2>
            <FileSystemEntryInfoList
                fileSystemEntriesInfoDTO={fileSystemEntriesInfoList.filter((fileSystemEntryInfo) => fileSystemEntryInfo.deleteDate == null)}
                openFileUploadPopup={openFileUploadPopup}
                openFileMovePopup={openFileMovePopup}
                setFileUploadDirectory={setFileUploadDirectory}
                refreshFileSystemEntriesInfos={refreshFileSystemEntriesInfoList}
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

            {directoryCreateCardVisible && (
                <DirectoryNameSetCard
                    setDirectoryCreateCardVisible={setDirectoryCreateCardVisible}
                    fileRefreshFunction={refreshFileSystemEntriesInfoList}
                />
            )}
        </>
    )
}

export default UploadedFilesTab
