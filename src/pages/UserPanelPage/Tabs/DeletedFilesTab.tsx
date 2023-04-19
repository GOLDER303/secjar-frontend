import React from "react"
import { useOutletContext } from "react-router"
import FileSystemEntryInfoList from "../../../components/FileSystemEntryInfoList"
import FileSystemEntryInfoDTO from "../../../ts/interfaces/FileSystemEntryInfoDTO"
import { fileSystemEntriesInfoListContextType } from "../UserPanelPage"

const DeletedFilesTab: React.FC = () => {
    const { fileSystemEntriesInfoList, refreshFileSystemEntriesInfoList } = useOutletContext<fileSystemEntriesInfoListContextType>()

    const displayRule = (fileSystemEntryInfo: FileSystemEntryInfoDTO) => {
        return fileSystemEntryInfo.deleteDate != null
    }

    return (
        <>
            <h2>Usunięte pliki</h2>
            <FileSystemEntryInfoList
                fileSystemEntriesInfoDTO={fileSystemEntriesInfoList}
                displayRule={displayRule}
                refreshFileSystemEntriesInfos={refreshFileSystemEntriesInfoList}
            />
        </>
    )
}

export default DeletedFilesTab
