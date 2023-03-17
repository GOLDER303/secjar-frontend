import React from "react"
import { useOutletContext } from "react-router"
import FileSharePopup from "../../../components/FileActionsPopups/FileSharePopup"
import FileSystemEntryInfoList from "../../../components/FileSystemEntryInfoList"
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

    return (
        <>
            <h2>Przesłane pliki</h2>
            <FileSystemEntryInfoList
                fileSystemEntriesInfoDTO={fileSystemEntriesInfoList.filter((fileSystemEntryInfo) => fileSystemEntryInfo.authorizedUsers.length > 1 || fileSystemEntryInfo.sharedByLink)}
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
