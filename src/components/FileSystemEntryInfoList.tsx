import React from "react"
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO"
import FileSystemEntryInfo from "./FileSystemEntryInfo"

interface FileSystemEntryInfoListProps {
    fileSystemEntriesInfoDTO: FileSystemEntryInfoDTO[]
    setFileUploadCardVisible: (param: boolean) => void
    setFileUploadDirectory: (param: string) => void
}

const FileSystemEntryInfoList: React.FC<FileSystemEntryInfoListProps> = ({ fileSystemEntriesInfoDTO, setFileUploadCardVisible, setFileUploadDirectory }) => {
    return (
        <table>
            <tr>
                <th>Nazwa pliku</th>
                <th>Typ</th>
                <th>Właściciel</th>
                <th>Rozmiar</th>
            </tr>
            {fileSystemEntriesInfoDTO.map((fileSystemEntryInfoDTO) => {
                return <FileSystemEntryInfo
                    fileSystemEntryInfoDTO={fileSystemEntryInfoDTO}
                    setFileUploadCardVisible={setFileUploadCardVisible}
                    setFileUploadDirectory={setFileUploadDirectory}
                />
            })}
        </table>
    )
}

export default FileSystemEntryInfoList
