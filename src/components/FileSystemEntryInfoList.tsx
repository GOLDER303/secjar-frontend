import React from "react"
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO"
import FileDirectory from "./FileDirectory"
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
            </tr>
            {fileSystemEntriesInfoDTO.map((fileSystemEntryInfoDTO) => {
                if (fileSystemEntryInfoDTO.contentType == "directory") {
                    return (
                        <FileDirectory
                            fileSystemEntryInfoDTO={fileSystemEntryInfoDTO}
                            openFileInputPopup={openFileInputPopup}
                            setFileUploadDirectory={setFileUploadDirectory}
                        />
                    )
                } else {
                    return <FileSystemEntryInfo fileSystemEntryInfoDTO={fileSystemEntryInfoDTO} />
                }
            })}
        </table>
    )
}

export default FileSystemEntryInfoList
