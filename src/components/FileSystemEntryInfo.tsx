import React from "react"
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO"

interface FileEntryProps {
    fileSystemEntryInfoDTO: FileSystemEntryInfoDTO
}

const sizeUnits = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"]

const FileSystemEntryInfo: React.FC<FileEntryProps> = ({ fileSystemEntryInfoDTO }) => {
    let sizeValue = 0
    let sizeUnit = ""

    if (fileSystemEntryInfoDTO.size != 0) {
        const getBaseLog = (val: number, base: number) => {
            return Math.log(val) / Math.log(base)
        }

        const sizeScale = Math.min(Math.floor(getBaseLog(fileSystemEntryInfoDTO.size, 1024)), 6)
        sizeValue = Math.floor((100 * fileSystemEntryInfoDTO.size) / Math.pow(1024, sizeScale)) / 100
        sizeUnit = sizeUnits[sizeScale]
    }

    let contentType: string

    switch (fileSystemEntryInfoDTO.contentType) {
        case "text/plain":
            contentType = "txt"
            break
        case "directory":
            contentType = "directory"
            break
        default:
            contentType = fileSystemEntryInfoDTO.contentType
    }

    return (
        <tr key={fileSystemEntryInfoDTO.id}>
            <td>{fileSystemEntryInfoDTO.name}</td>
            <td>{contentType}</td>
            <td>{fileSystemEntryInfoDTO.uuid}</td>
            <td>
                {sizeValue} {sizeUnit}
            </td>
            <td></td>
            {/* TODO: show last update date */}
        </tr>
    )
}

export default FileSystemEntryInfo
