import React, { useState } from "react"
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO"
import { formatFileSize } from "../utils/FormatFileSizeUtil"

interface FileEntryProps {
    fileSystemEntryInfoDTO: FileSystemEntryInfoDTO
    openFileInputPopup: () => void
    openFileMovePopup: (targetFileUuid: string) => void
    setFileUploadDirectory: (param: string) => void
    handleFileDelete: (fileUuid: string) => void
    handleFileFavoriteToggle: (fileUuid: string, isFavorite: boolean) => void
}

const FileSystemEntryInfo: React.FC<FileEntryProps> = ({ fileSystemEntryInfoDTO, openFileInputPopup, openFileMovePopup, setFileUploadDirectory, handleFileDelete, handleFileFavoriteToggle }) => {
    const [showFileArray, setShowFileArray] = useState(false)
    const colSpan = 6 //number of collumns in the table

    const { sizeValue, sizeUnit } = formatFileSize(fileSystemEntryInfoDTO.size)

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
                <td
                    onClick={() => {
                        handleFileFavoriteToggle(fileSystemEntryInfoDTO.uuid, fileSystemEntryInfoDTO.favorite)
                    }}
                >
                    {fileSystemEntryInfoDTO.favorite ? "★" : "☆"}
                </td>
                <td>
                    <button
                        onClick={() => {
                            handleFileDelete(fileSystemEntryInfoDTO.uuid)
                        }}
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => {
                            openFileMovePopup(fileSystemEntryInfoDTO.uuid)
                        }}
                    >
                        Move
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
                                        openFileMovePopup={openFileMovePopup}
                                        setFileUploadDirectory={setFileUploadDirectory}
                                        handleFileDelete={handleFileDelete}
                                        handleFileFavoriteToggle={handleFileFavoriteToggle}
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
