import React from "react"
import { useOutletContext } from "react-router"
import FileSharePopup from "../../../components/FileActionsPopups/FileSharePopup"
import FileSystemEntryInfoList from "../../../components/FileSystemEntryInfoList"
import FileSystemEntryInfoDTO from "../../../ts/interfaces/FileSystemEntryInfoDTO"
import { fileSystemEntriesInfoListContextType } from "../UserPanelPage"

const SharedFilesTab: React.FC = () => {
    const [isFileSharePopupVisible, setIsFileSharePopupVisible] = React.useState(false)

    const [targetFileUuid, setTargetFileUuid] = React.useState("")

    const { fileSystemEntriesInfoList, refreshFileSystemEntriesInfoList } = useOutletContext<fileSystemEntriesInfoListContextType>()

    const closeFileSharePopup = () => {
        setIsFileSharePopupVisible(false)
    }

    const openFileSharePopup = (targetFileUuid: string) => {
        setTargetFileUuid(targetFileUuid)
        setIsFileSharePopupVisible(true)
    }

    const displayRule = (fileSystemEntryInfo: FileSystemEntryInfoDTO) => {
        return fileSystemEntryInfo.authorizedUsers.length > 1 || fileSystemEntryInfo.sharedByLink
    }

    return (
        <>
            <h2>Przesłane pliki</h2>
            <FileSystemEntryInfoList
                fileSystemEntriesInfoDTO={fileSystemEntriesInfoList}
                displayRule={displayRule}
                openFileSharePopup={openFileSharePopup}
                refreshFileSystemEntriesInfos={refreshFileSystemEntriesInfoList}
            />
            {isFileSharePopupVisible && (
                <FileSharePopup
                    targetFileUuid={targetFileUuid}
                    closePopup={closeFileSharePopup}
                    fileShareCallback={refreshFileSystemEntriesInfoList}
                />
            )}
        </>
    )
}

export default SharedFilesTab
