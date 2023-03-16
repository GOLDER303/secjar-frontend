import React from "react"
import { deleteFile, downloadFileSystemEntry, patchFile } from "../services/FileSystemEntryInfoService"
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO"
import FileSystemEntryInfo from "./FileSystemEntryInfo"

interface FileSystemEntryInfoListProps {
    fileSystemEntriesInfoDTO: FileSystemEntryInfoDTO[]
    openFileUploadPopup: () => void
    openFileMovePopup: (targetFileUuid: string) => void
    setFileUploadDirectory: (param: string) => void
    refreshFileSystemEntriesInfos: () => void
}

const FileSystemEntryInfoList: React.FC<FileSystemEntryInfoListProps> = ({ fileSystemEntriesInfoDTO, openFileUploadPopup, openFileMovePopup, setFileUploadDirectory, refreshFileSystemEntriesInfos }) => {
    const handleFileDelete = async (fileUuid: string) => {
        const response = await deleteFile(fileUuid, true)
        refreshFileSystemEntriesInfos()
    }

    const handleFileFavoriteToggle = async (fileUuid: string, isFavorite: boolean) => {
        const response = await patchFile(fileUuid, !isFavorite)
        refreshFileSystemEntriesInfos()
    }

    const handleFileSystemEntryDownload = async (fileSystemEntryUuid: string, fileName: string, fileExtension: string) => {
        downloadFileSystemEntry(fileSystemEntryUuid, fileName, fileExtension)
    }

    return (
        <table>
            <tr>
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
                        setFileUploadDirectory={setFileUploadDirectory}
                        handleFileDelete={handleFileDelete}
                        handleFileFavoriteToggle={handleFileFavoriteToggle}
                        handleFileSystemEntryDownload={handleFileSystemEntryDownload}
                    />
                )
            })}
        </table>
    )
}

export default FileSystemEntryInfoList
