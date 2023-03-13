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
                    setFileUploadCardVisible={(isVisible : boolean) => {setFileUploadCardVisible(isVisible)}}
                    setFileUploadDirectory={(directory : string) => {setFileUploadDirectory(directory)}}
                />
            })}
        </table>
    )
}

export default FileSystemEntryInfoList
