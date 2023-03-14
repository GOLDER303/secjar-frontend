import React, { useState } from "react"
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO"
import FileSystemEntryInfoList from "./FileSystemEntryInfoList"

interface FileDirectoryProps {
    fileSystemEntryInfoDTO: FileSystemEntryInfoDTO
    openFileInputPopup: () => void
    setFileUploadDirectory: (param: string) => void
}

const FileDirectory: React.FC<FileDirectoryProps> = ({ fileSystemEntryInfoDTO, openFileInputPopup, setFileUploadDirectory }) => {
    const [showFileArray, setShowFileArray] = useState(false)
    const colSpan = 4 //number of collumns in the table

    return (
        <>
            <tr
                className="directory"
                key={fileSystemEntryInfoDTO.id}
            >
                <td>{fileSystemEntryInfoDTO.name}</td>
                <td>Directory</td>
                <td>{fileSystemEntryInfoDTO.uuid}</td>
                <td></td>
                <td>
                    <button
                        onClick={() => {
                            openFileInputPopup()
                            setFileUploadDirectory(fileSystemEntryInfoDTO.uuid)
                        }}
                    >
                        Upload here
                    </button>
                </td>
            </tr>
            <tr>
                <td
                    className="directory"
                    colSpan={colSpan}
                    onClick={() => {
                        setShowFileArray(!showFileArray)
                    }}
                >
                    {showFileArray ? (
                        <>
                            ▼
                            <FileSystemEntryInfoList
                                fileSystemEntriesInfoDTO={fileSystemEntryInfoDTO.children}
                                openFileUploadPopup={openFileInputPopup}
                                setFileUploadDirectory={setFileUploadDirectory}
                            />
                        </>
                    ) : (
                        <>►</>
                    )}
                </td>
            </tr>
        </>
    )
}

export default FileDirectory
