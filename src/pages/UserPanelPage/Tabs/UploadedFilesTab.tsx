import React, { useEffect } from "react"
import DirectoryNameSetCard from "../../../components/DirectoryNameSetCard"
import FileMovePopup from "../../../components/FileMovePopup"
import FileSystemEntryInfoList from "../../../components/FileSystemEntryInfoList"
import FileUploadPopup from "../../../components/FileUploadPopup"
import { deleteFile, downloadFileSystemEntry, fileUpload, getFileSystemEntriesInfo, patchFile } from "../../../services/FileSystemEntryInfoService"
import FileSystemEntryInfoDTO from "../../../ts/interfaces/FileSystemEntryInfoDTO"

const UploadedFilesTab: React.FC = () => {
    const [isFileUploadPopupVisible, setIsFileUploadPopupVisible] = React.useState(false)
    const [directoryCreateCardVisible, setDirectoryCreateCardVisible] = React.useState(false)
    const [fileUploadDirectory, setFileUploadDirectory] = React.useState<string | null>(null)
    const [fileSystemEntriesInfo, setFileSystemEntriesInfo] = React.useState<FileSystemEntryInfoDTO[]>([])
    const [isFileMovePopupVisible, setIsFileMovePopupVisible] = React.useState(false)
    const [targetFileUuid, setTargetFileUuid] = React.useState("")

    useEffect(() => {
        refreshFileSystemEntriesInfo()
    }, [])

    const refreshFileSystemEntriesInfo = async () => {
        const response = await getFileSystemEntriesInfo()
        if (response.error) {
            //TODO: handle error
        }
        if (response.data) {
            setFileSystemEntriesInfo(
                response.data.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (a.name < b.name) {
                        return -1
                    }
                    return 0
                })
            )
        }
        //TODO: function to load only uploaded and updated files after refresh??
    }

    const closeFileUploadPopup = () => {
        setIsFileUploadPopupVisible(false)
    }

    const openFileUploadPopup = () => {
        setIsFileUploadPopupVisible(true)
    }

    const closeFileMovePopup = () => {
        setIsFileMovePopupVisible(false)
    }

    const openFileMovePopup = (targetFileUuid: string) => {
        setTargetFileUuid(targetFileUuid)
        setIsFileMovePopupVisible(true)
    }

    const handleFileUpload = async (fileToUpload: File) => {
        const response = await fileUpload(fileToUpload, false, fileUploadDirectory)
        refreshFileSystemEntriesInfo()
    }

    const handleFileMove = async (fileUuid: string, targetDirName: string) => {
        let targetDirUuid = ""
        if (targetDirName != "") {
            targetDirUuid = fileSystemEntriesInfo.filter((fileSystemEntryInfo) => fileSystemEntryInfo.name == targetDirName)[0].uuid
        }
        const response = await patchFile(fileUuid, undefined, targetDirUuid)
        refreshFileSystemEntriesInfo()
    }

    const handleFileDelete = async (fileUuid: string) => {
        const response = await deleteFile(fileUuid, true)

        if (response.error) {
        }

        refreshFileSystemEntriesInfo()
    }

    const handleFileFavoriteToggle = async (fileUuid: string, isFavorite: boolean) => {
        const response = await patchFile(fileUuid, !isFavorite)
        refreshFileSystemEntriesInfo()
    }

    const handleFileSystemEntryDownload = async (fileSystemEntryUuid: string, fileName: string, fileExtension: string) => {
        downloadFileSystemEntry(fileSystemEntryUuid, fileName, fileExtension)
    }

    return (
        <>
            <h2>Przesłane pliki</h2>
            <FileSystemEntryInfoList
                fileSystemEntriesInfoDTO={fileSystemEntriesInfo.filter((fileSystemEntryInfo) => fileSystemEntryInfo.deleteDate == null)}
                openFileUploadPopup={openFileUploadPopup}
                openFileMovePopup={openFileMovePopup}
                setFileUploadDirectory={setFileUploadDirectory}
                handleFileDelete={handleFileDelete}
                handleFileFavoriteToggle={handleFileFavoriteToggle}
                handleFileSystemEntryDownload={handleFileSystemEntryDownload}
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

            {isFileMovePopupVisible && (
                <FileMovePopup
                    targetFileUuid={targetFileUuid}
                    handleFileMove={handleFileMove}
                    closePopup={closeFileMovePopup}
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
