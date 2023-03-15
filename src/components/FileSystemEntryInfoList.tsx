import React from "react"
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO"
import FileSystemEntryInfo from "./FileSystemEntryInfo"

interface FileSystemEntryInfoListProps {
    fileSystemEntriesInfoDTO: FileSystemEntryInfoDTO[]
    openFileUploadPopup: () => void
    setFileUploadDirectory: (param: string) => void
    handleFileDelete: (fileUuid: string) => void
    handleFileFavoriteToggle: (fileUuid: string, isFavorite: boolean) => void
}

const FileSystemEntryInfoList: React.FC<FileSystemEntryInfoListProps> = ({ fileSystemEntriesInfoDTO, openFileUploadPopup, setFileUploadDirectory, handleFileDelete, handleFileFavoriteToggle }) => {
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
                        setFileUploadDirectory={setFileUploadDirectory}
                        handleFileDelete={handleFileDelete}
                        handleFileFavoriteToggle={handleFileFavoriteToggle}
                    />
                )
            })}
        </table>
    )
}

export default FileSystemEntryInfoList
