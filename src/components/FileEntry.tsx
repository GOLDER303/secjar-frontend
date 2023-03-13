import React from "react"
import FileSystemEntryInfo from "../ts/interfaces/FileSystemEntryInfo"
import FileDirectory from "./FileDirectory"

interface FileEntryProps {
    fileSystemEntryInfo: FileSystemEntryInfo
    setFileUploadCardVisible: (param: boolean) => void
    setFileUploadDirectory: (param: string) => void
}

const sizeUnits = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"]
const FileEntry: React.FC<FileEntryProps> = (props) => {
    let sizeValue = 0
    let sizeUnit = ""

    if (props.fileSystemEntryInfo.size != 0) {
        const getBaseLog = (val: number, base: number) => {
            return Math.log(val) / Math.log(base)
        }
        const sizeScale = Math.min(Math.floor(getBaseLog(props.fileSystemEntryInfo.size, 1024)), 6)
        sizeValue = Math.floor((100 * props.fileSystemEntryInfo.size) / Math.pow(1024, sizeScale)) / 100
        sizeUnit = sizeUnits[sizeScale]
    }

    let contentType: string
    switch (props.fileSystemEntryInfo.contentType) {
        case "text/plain":
            contentType = "txt"
            break
        case "directory":
            contentType = "directory"
            break
        default:
            contentType = props.fileSystemEntryInfo.contentType
    }

    return (
        contentType == "directory"? (
            <FileDirectory
                key={props.fileSystemEntryInfo.id}
                fileSystemEntryInfo={props.fileSystemEntryInfo}
                setFileUploadCardVisible={(isVisible : boolean) => {props.setFileUploadCardVisible(isVisible)}}
                setFileUploadDirectory={(directory : string) => {props.setFileUploadDirectory(directory)}}
            />
        ) : (
            <tr>
                <td>{props.fileSystemEntryInfo.name}</td>
                <td>{contentType}</td>
                <td>{props.fileSystemEntryInfo.uuid}</td>
                <td>
                    {sizeValue} {sizeUnit}
                </td>
                {/* TODO: show last update date */}
            </tr>
        )
    )
}

export default FileEntry