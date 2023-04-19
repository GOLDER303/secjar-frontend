import React from "react"
import { useOutletContext } from "react-router"
import FileMovePopup from "../../../components/FileActionsPopups/FileMovePopup"
import FileSharePopup from "../../../components/FileActionsPopups/FileSharePopup"
import FileUploadPopup from "../../../components/FileActionsPopups/FileUploadPopup"
import FileSystemEntryInfoList from "../../../components/FileSystemEntryInfoList"
import FileSystemEntryInfoDTO from "../../../ts/interfaces/FileSystemEntryInfoDTO"
import { fileSystemEntriesInfoListContextType } from "../UserPanelPage"

const FavoriteFilesTab: React.FC = () => {
    const [isFileUploadPopupVisible, setIsFileUploadPopupVisible] = React.useState(false)
    const [isFileMovePopupVisible, setIsFileMovePopupVisible] = React.useState(false)
    const [isFileSharePopupVisible, setIsFileSharePopupVisible] = React.useState(false)

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

    const closeFileSharePopup = () => {
        setIsFileSharePopupVisible(false)
    }

    const openFileSharePopup = (targetFileUuid: string) => {
        setTargetFileUuid(targetFileUuid)
        setIsFileSharePopupVisible(true)
    }

    const displayRule = (fileSystemEntryInfo: FileSystemEntryInfoDTO) => {
        return fileSystemEntryInfo.favorite && fileSystemEntryInfo.deleteDate == null
    }

    return (
        <>
            <h2>Ulubione pliki</h2>
            <FileSystemEntryInfoList
                fileSystemEntriesInfoDTO={fileSystemEntriesInfoList}
                displayRule={displayRule}
                openFileUploadPopup={openFileUploadPopup}
                openFileMovePopup={openFileMovePopup}
                openFileSharePopup={openFileSharePopup}
                setFileUploadDirectory={setFileUploadDirectory}
                refreshFileSystemEntriesInfos={refreshFileSystemEntriesInfoList}
            />

            {isFileUploadPopupVisible && (
                <FileUploadPopup
                    targetDirUuid={fileUploadDirectory}
                    fileUploadCallback={refreshFileSystemEntriesInfoList}
                    closePopup={closeFileUploadPopup}
                />
            )}

            {isFileSharePopupVisible && (
                <FileSharePopup
                    targetFileUuid={targetFileUuid}
                    closePopup={closeFileSharePopup}
                    fileShareCallback={refreshFileSystemEntriesInfoList}
                />
            )}

            {isFileMovePopupVisible && (
                <FileMovePopup
                    targetFileUuid={targetFileUuid}
                    fileSystemEntriesInfos={fileSystemEntriesInfoList.filter((fileSystemEntryInfo) => {
                        return fileSystemEntryInfo.deleteDate == null && fileSystemEntryInfo.favorite
                    })}
                    fileMoveCallback={refreshFileSystemEntriesInfoList}
                    closePopup={closeFileMovePopup}
                />
            )}
        </>
    )
}

export default FavoriteFilesTab
