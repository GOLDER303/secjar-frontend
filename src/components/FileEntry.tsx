import React from "react"
import FileSystemEntryInfo from "../ts/interfaces/FileSystemEntryInfo"

interface FileEntryProps {
    fileSystemEntryInfo: FileSystemEntryInfo
}

const sizeUnits = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"]

const FileEntry: React.FC<FileEntryProps> = ({ fileSystemEntryInfo }) => {
    let sizeValue = 0
    let sizeUnit = ""

    if (fileSystemEntryInfo.size != 0) {
        const getBaseLog = (val: number, base: number) => {
            return Math.log(val) / Math.log(base)
        }

        const sizeScale = Math.min(Math.floor(getBaseLog(fileSystemEntryInfo.size, 1024)), 6)
        sizeValue = Math.floor((100 * fileSystemEntryInfo.size) / Math.pow(1024, sizeScale)) / 100
        sizeUnit = sizeUnits[sizeScale]
    }

    let contentType: string

    switch (fileSystemEntryInfo.contentType) {
        case "text/plain":
            contentType = "txt"
            break
        default:
            contentType = fileSystemEntryInfo.contentType
    }

    return (
        <tr>
            <td>{fileSystemEntryInfo.name}</td>
            <td>{contentType}</td>
            <td>{fileSystemEntryInfo.uuid}</td>
            <td>
                {sizeValue} {sizeUnit}
            </td>
        </tr>
    )
}

export default FileEntry
