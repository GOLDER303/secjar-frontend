import React, { useState } from "react"
import { patchFile } from "../services/FileSystemEntryInfoService"
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO"
import { formatFileSize } from "../utils/FormatFileSizeUtil"
import DoubleClickEditText from "./DoubleClickEditText"
import formatFileContentType from "../utils/FormatFileContentType"

interface FileEntryProps {
    fileSystemEntryInfoDTO: FileSystemEntryInfoDTO
    openFileInputPopup: () => void
    openFileMovePopup: (targetFileUuid: string) => void
    setFileUploadDirectory: (param: string) => void
    handleFileDelete: (fileUuid: string) => void
    handleFileFavoriteToggle: (fileUuid: string, isFavorite: boolean) => void
    handleFileSystemEntryDownload: (fileSystemEntryUuid: string, fileName: string, fileExtension: string) => void
}

const FileSystemEntryInfo: React.FC<FileEntryProps> = ({ fileSystemEntryInfoDTO, openFileInputPopup, openFileMovePopup, setFileUploadDirectory, handleFileDelete, handleFileFavoriteToggle, handleFileSystemEntryDownload }) => {
    const [showFileArray, setShowFileArray] = useState(false)
    const colSpan = 6 //number of collumns in the table

    const { sizeValue, sizeUnit } = formatFileSize(fileSystemEntryInfoDTO.size)

    const { contentType, isDirectory } = formatFileContentType(fileSystemEntryInfoDTO.contentType)

    const handleNameChange = (name: string) => {
        patchFile(fileSystemEntryInfoDTO.uuid, undefined, undefined, name)
    }

    return (
        <>
            <tr className={fileSystemEntryInfoDTO.parent != null || isDirectory ? "directory" : ""}>
                <td>
                    <DoubleClickEditText
                        value={fileSystemEntryInfoDTO.name}
                        onBlurCallback={handleNameChange}
                    />
                </td>
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
                            handleFileSystemEntryDownload(fileSystemEntryInfoDTO.uuid, fileSystemEntryInfoDTO.name, contentType)
                        }}
                    >
                        Download
                    </button>
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
                                        handleFileSystemEntryDownload={handleFileSystemEntryDownload}
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
