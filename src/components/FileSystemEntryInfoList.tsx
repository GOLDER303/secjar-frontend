import React from "react"
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO"
import FileSystemEntryInfo from "./FileSystemEntryInfo"

interface FileSystemEntryInfoListProps {
    fileSystemEntriesInfoDTO: FileSystemEntryInfoDTO[]
}

const FileSystemEntryInfoList: React.FC<FileSystemEntryInfoListProps> = ({ fileSystemEntriesInfoDTO }) => {
    return (
        <table>
            <tr>
                <th>Nazwa pliku</th>
                <th>Typ</th>
                <th>Właściciel</th>
                <th>Rozmiar</th>
            </tr>
            {fileSystemEntriesInfoDTO.map((fileSystemEntryInfoDTO) => {
                return <FileSystemEntryInfo fileSystemEntryInfoDTO={fileSystemEntryInfoDTO} />
            })}
        </table>
    )
}

export default FileSystemEntryInfoList
