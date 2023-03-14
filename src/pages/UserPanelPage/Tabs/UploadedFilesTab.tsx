import React, { useEffect } from "react"
import DirectoryNameSetCard from "../../../components/DirectoryNameSetCard"
import FileSystemEntryInfoList from "../../../components/FileSystemEntryInfoList"
import FileUploadPopup from "../../../components/FileUploadPopup"
import { deleteFile, fileUpload, getFileSystemEntriesInfo } from "../../../services/FileSystemEntryInfoService"
import FileSystemEntryInfoDTO from "../../../ts/interfaces/FileSystemEntryInfoDTO"

const UploadedFilesTab: React.FC = () => {
    const [isFileUploadPopupVisible, setIsFileUploadPopupVisible] = React.useState(false)
    const [directoryCreateCardVisible, setDirectoryCreateCardVisible] = React.useState(false)
    const [fileUploadDirectory, setFileUploadDirectory] = React.useState<string | null>(null)
    const [fileSystemEntriesInfo, setFileSystemEntriesInfo] = React.useState<FileSystemEntryInfoDTO[]>([])

    useEffect(() => {
        refreshFileSystemEntriesInfo()
    }, [])

    const refreshFileSystemEntriesInfo = async () => {
        const response = await getFileSystemEntriesInfo()
        if (response.error) {
            //TODO: handle error
        }
        if (response.data) {
            setFileSystemEntriesInfo(response.data)
        }
        //TODO: function to load only uploaded and updated files after refresh??
    }

    const closeFileUploadPopup = () => {
        setIsFileUploadPopupVisible(false)
    }

    const openFileUploadPopup = () => {
        setIsFileUploadPopupVisible(true)
    }

    const handleFileUpload = async (fileToUpload: File) => {
        const response = await fileUpload(fileToUpload, false, fileUploadDirectory)
        refreshFileSystemEntriesInfo()
    }

    const handleFileDelete = async (fileUuid: string) => {
        const response = await deleteFile(fileUuid, true)

        if (response.error) {
        }

        refreshFileSystemEntriesInfo()
    }

    return (
        <>
            <h2>Przesłane pliki</h2>
            <FileSystemEntryInfoList
                fileSystemEntriesInfoDTO={fileSystemEntriesInfo.filter((fileSystemEntryInfo) => fileSystemEntryInfo.deleteDate == null)}
                openFileUploadPopup={openFileUploadPopup}
                setFileUploadDirectory={setFileUploadDirectory}
                handleFileDelete={handleFileDelete}
            />
            <button
                onClick={() => {
                    setFileUploadDirectory(null)
                    openFileUploadPopup()
                }}
            >
                Upload to root
            </button>
            <button onClick={() => setDirectoryCreateCardVisible(true)}>Create directories</button>

            {isFileUploadPopupVisible && (
                <FileUploadPopup
                    handleFileUpload={handleFileUpload}
                    closePopup={closeFileUploadPopup}
                />
            )}

            {directoryCreateCardVisible && (
                <DirectoryNameSetCard
                    setDirectoryCreateCardVisible={setDirectoryCreateCardVisible}
                    fileRefreshFunction={refreshFileSystemEntriesInfo}
                />
            )}
        </>
    )
}

export default UploadedFilesTab
