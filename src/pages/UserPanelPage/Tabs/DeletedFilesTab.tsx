import React from "react"
import { useOutletContext } from "react-router"
import FileSystemEntryInfoList from "../../../components/FileSystemEntryInfoList"
import { fileSystemEntriesInfoListContextType } from "../UserPanelPage"

const DeletedFilesTab: React.FC = () => {
    const { fileSystemEntriesInfoList, refreshFileSystemEntriesInfoList } = useOutletContext<fileSystemEntriesInfoListContextType>()

    return (
        <>
            <h2>Usunięte pliki</h2>
            <FileSystemEntryInfoList
                fileSystemEntriesInfoDTO={fileSystemEntriesInfoList.filter((fileSystemEntryInfo) => {
                    return fileSystemEntryInfo.deleteDate != null
                })}
                refreshFileSystemEntriesInfos={refreshFileSystemEntriesInfoList}
            />
        </>
    )
}

export default DeletedFilesTab
