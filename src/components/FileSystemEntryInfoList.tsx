import React from "react"
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO"
import FileSystemEntryInfo from "./FileSystemEntryInfo"

interface FileSystemEntryInfoListProps {
    fileSystemEntriesInfoDTO: FileSystemEntryInfoDTO[]
    openFileUploadPopup: () => void
    setFileUploadDirectory: (param: string) => void
}

const FileSystemEntryInfoList: React.FC<FileSystemEntryInfoListProps> = ({ fileSystemEntriesInfoDTO, openFileUploadPopup: openFileInputPopup, setFileUploadDirectory }) => {
    return (
        <table>
            <tr>
                <th>Nazwa pliku</th>
                <th>Typ</th>
                <th>Właściciel</th>
                <th>Rozmiar</th>
                <th>Data przesłania</th>
                <th>Akcje</th>
            </tr>
            {fileSystemEntriesInfoDTO.map((fileSystemEntryInfoDTO) => {
                return (
                    <FileSystemEntryInfo
                        fileSystemEntryInfoDTO={fileSystemEntryInfoDTO}
                        openFileInputPopup={openFileInputPopup}
                        setFileUploadDirectory={setFileUploadDirectory}
                    />
                )
            })}
        </table>
    )
}

export default FileSystemEntryInfoList
