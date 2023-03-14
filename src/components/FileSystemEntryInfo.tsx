import React, { useState } from "react"
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO"

interface FileEntryProps {
    fileSystemEntryInfoDTO: FileSystemEntryInfoDTO
    openFileInputPopup: () => void
    setFileUploadDirectory: (param: string) => void
    handleFileDelete: (fileUuid: string) => void
}

const sizeUnits = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"]

const FileSystemEntryInfo: React.FC<FileEntryProps> = ({ fileSystemEntryInfoDTO, openFileInputPopup, setFileUploadDirectory, handleFileDelete }) => {
    const [showFileArray, setShowFileArray] = useState(false)
    const colSpan = 6 //number of collumns in the table
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

    const isDirectory = contentType === "directory"

    return (
        <>
            <tr className={fileSystemEntryInfoDTO.parent != null || isDirectory ? "directory" : ""}>
                <td>{fileSystemEntryInfoDTO.name}</td>
                <td>{contentType}</td>
                <td>{fileSystemEntryInfoDTO.uuid}</td>
                <td>
                    {sizeValue} {sizeUnit}
                </td>
                <td>{new Date(fileSystemEntryInfoDTO.uploadDate).toLocaleDateString()}</td>
                <td>
                    <button
                        onClick={() => {
                            handleFileDelete(fileSystemEntryInfoDTO.uuid)
                        }}
                    >
                        Delete
                    </button>
                    {isDirectory && (
                        <button
                            onClick={() => {
                                openFileInputPopup()
                                setFileUploadDirectory(fileSystemEntryInfoDTO.uuid)
                            }}
                        >
                            Upload here
                        </button>
                    )}
                </td>
            </tr>
            {isDirectory && (
                <>
                    <tr className="directory">
                        <td
                            colSpan={colSpan}
                            onClick={() => {
                                setShowFileArray(!showFileArray)
                            }}
                        >
                            {showFileArray ? "▼" : "►"}
                        </td>
                    </tr>
                    {showFileArray && (
                        <>
                            {fileSystemEntryInfoDTO.children.map((fileSystemEntryInfo) => {
                                return (
                                    <FileSystemEntryInfo
                                        fileSystemEntryInfoDTO={fileSystemEntryInfo}
                                        openFileInputPopup={openFileInputPopup}
                                        setFileUploadDirectory={setFileUploadDirectory}
                                        handleFileDelete={handleFileDelete}
                                    />
                                )
                            })}
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default FileSystemEntryInfo
