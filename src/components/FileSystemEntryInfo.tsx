import React, { useState } from "react"
import { useLocation } from "react-router"
import { UsernamesUuidsMapContext, UsernamesUuidsMapContextType } from "../contexts/UsernamesUuidsMapContext"
import { patchFile } from "../services/FileSystemEntryInfoService"
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO"
import formatFileContentType from "../utils/FormatFileContentType"
import { formatFileSize } from "../utils/FormatFileSizeUtil"
import DoubleClickEditText from "./DoubleClickEditText"

interface FileEntryProps {
    fileSystemEntryInfoDTO: FileSystemEntryInfoDTO
    openFileInputPopup?: () => void
    openFileMovePopup?: (targetFileUuid: string) => void
    openFileSharePopup?: (targetFileUuid: string) => void
    openDirectoryCreatePopup?: (targetDirUuid: string) => void
    setFileUploadDirectory?: (param: string) => void
    handleFileDelete: (fileUuid: string, instantDelete: boolean) => void
    handleFileFavoriteToggle: (fileUuid: string, isFavorite: boolean) => void
    handleFileSystemEntryDownload: (fileSystemEntryUuid: string, fileName: string, fileExtension: string) => void
    handleFileSystemEntryRestore: (fileSystemEntryUuid: string) => void
    currentClassName: string
    setParentDirectoryClassNameCallback: (name: string) => void
    setDirectoryPathCallback: (directory: string) => void
}

const FileSystemEntryInfo: React.FC<FileEntryProps> = ({
    fileSystemEntryInfoDTO,
    openFileInputPopup,
    openFileMovePopup,
    openFileSharePopup,
    openDirectoryCreatePopup,
    setFileUploadDirectory,
    handleFileDelete,
    handleFileFavoriteToggle,
    handleFileSystemEntryDownload,
    handleFileSystemEntryRestore,
    currentClassName,
    setParentDirectoryClassNameCallback,
    setDirectoryPathCallback,
}) => {
    const [showFileArray, setShowFileArray] = useState(false)

    const { usernamesUuidsMap } = React.useContext(UsernamesUuidsMapContext) as UsernamesUuidsMapContextType

    const [thisClassName, setThisClassName] = React.useState("")
    //Locks the state of thisClassName
    const [isClassNameLocked, setIsClassNameLocked] = React.useState(true)

    const location = useLocation()

    const { sizeValue, sizeUnit } = formatFileSize(fileSystemEntryInfoDTO.size)

    const { contentType, isDirectory } = formatFileContentType(fileSystemEntryInfoDTO.contentType)

    const handleNameChange = (name: string) => {
        patchFile(fileSystemEntryInfoDTO.uuid, undefined, undefined, name)
    }

    if (!usernamesUuidsMap) {
        return <h1>Coś poszło nie tak</h1>
    }

    React.useEffect(() => {
        if (isClassNameLocked){
            setThisClassName(currentClassName);
        }
        setIsClassNameLocked(true);
    }, [currentClassName])

    React.useEffect(() => {
        if (showFileArray) {
            setIsClassNameLocked(false);
            setParentDirectoryClassNameCallback("")
            setThisClassName("current-directory")
        }else {
            setParentDirectoryClassNameCallback("current-directory")
        }
    }, [showFileArray])

    return (
        <>
            <tr
                className={fileSystemEntryInfoDTO.parent != null || isDirectory ? "directory " + thisClassName : thisClassName}
                key={fileSystemEntryInfoDTO.uuid}
            >
                {isDirectory ? (
                    <td
                        onClick={() => {
                            setShowFileArray(!showFileArray)
                            if (showFileArray){
                                setDirectoryPathCallback("~" + fileSystemEntryInfoDTO.name)
                            }else {
                                setDirectoryPathCallback(fileSystemEntryInfoDTO.name)
                            }
                        }}
                    >
                        {showFileArray ? "▼" : "►"}
                    </td>
                ) : (
                    <td />
                )}
                <td className="wrap">
                    <DoubleClickEditText
                        value={fileSystemEntryInfoDTO.name}
                        onBlurCallback={handleNameChange}
                    />
                </td>
                <td>{contentType}</td>
                <td>{usernamesUuidsMap.get(fileSystemEntryInfoDTO.user)}</td>
                <td>
                    {sizeValue} {sizeUnit}
                </td>
                <td>{new Date(fileSystemEntryInfoDTO.uploadDate).toLocaleDateString()}</td>
                <td
                    className="star-icon"
                    onClick={() => {
                        handleFileFavoriteToggle(fileSystemEntryInfoDTO.uuid, fileSystemEntryInfoDTO.favorite)
                    }}
                >
                    {fileSystemEntryInfoDTO.favorite ? "★" : "☆"}
                </td>
                <td>
                    <div className="table-buttons">
                        <button
                            onClick={() => {
                                handleFileSystemEntryDownload(fileSystemEntryInfoDTO.uuid, fileSystemEntryInfoDTO.name, contentType)
                            }}
                        >
                            Download
                        </button>
                        <button
                            onClick={() => {
                                handleFileDelete(fileSystemEntryInfoDTO.uuid, location.pathname === "/home/deleted")
                            }}
                        >
                            Delete
                        </button>
                        {location.pathname === "/home/deleted" && (
                            <button
                                onClick={() => {
                                    handleFileSystemEntryRestore(fileSystemEntryInfoDTO.uuid)
                                }}
                            >
                                Restore
                            </button>
                        )}
                        {openFileMovePopup && (
                            <button
                                onClick={() => {
                                    openFileMovePopup(fileSystemEntryInfoDTO.uuid)
                                }}
                            >
                                Move
                            </button>
                        )}
                        {openFileSharePopup && (
                            <button
                                onClick={() => {
                                    openFileSharePopup(fileSystemEntryInfoDTO.uuid)
                                }}
                            >
                                Share
                            </button>
                        )}
                        {isDirectory && openDirectoryCreatePopup && (
                            <button
                                onClick={() => {
                                    openDirectoryCreatePopup(fileSystemEntryInfoDTO.uuid)
                                }}
                            >
                                Create Directory
                            </button>
                        )}
                        {isDirectory && openFileInputPopup && setFileUploadDirectory && (
                            <button
                                onClick={() => {
                                    openFileInputPopup()
                                    setFileUploadDirectory(fileSystemEntryInfoDTO.uuid)
                                }}
                            >
                                Upload here
                            </button>
                        )}
                    </div>
                </td>
            </tr>
            {isDirectory && (
                <>
                    {showFileArray && (
                        <>
                            {fileSystemEntryInfoDTO.children.map((fileSystemEntryInfo) => {
                                return (
                                    <FileSystemEntryInfo
                                        fileSystemEntryInfoDTO={fileSystemEntryInfo}
                                        openFileInputPopup={openFileInputPopup}
                                        openFileMovePopup={openFileMovePopup}
                                        openFileSharePopup={openFileSharePopup}
                                        openDirectoryCreatePopup={openDirectoryCreatePopup}
                                        setFileUploadDirectory={setFileUploadDirectory}
                                        handleFileDelete={handleFileDelete}
                                        handleFileFavoriteToggle={handleFileFavoriteToggle}
                                        handleFileSystemEntryDownload={handleFileSystemEntryDownload}
                                        handleFileSystemEntryRestore={handleFileSystemEntryRestore}
                                        currentClassName={thisClassName}
                                        setParentDirectoryClassNameCallback={setThisClassName}
                                        setDirectoryPathCallback={setDirectoryPathCallback}
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
