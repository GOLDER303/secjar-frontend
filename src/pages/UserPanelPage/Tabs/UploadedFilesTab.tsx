import React, {useState} from "react"
import { useEffect } from "react"
import FileSystemEntryInfoList from "../../../components/FileSystemEntryInfoList"
import { getFileSystemEntriesInfo } from "../../../services/FileSystemEntryInfoService"
import FileSystemEntryInfoDTO from "../../../ts/interfaces/FileSystemEntryInfoDTO"
import DirectoryNameSetCard from "../../../components/DirectoryNameSetCard";
import FileUploadPopup from "../../../components/FileUploadPopup"

const UploadedFilesTab: React.FC = () => {
    const [fileUploadCardVisible, setFileUploadCardVisible] = useState(false);
    const [directoryCreateCardVisible, setDirectoryCreateCardVisible] = useState(false);
    const [fileUploadDirectory, setFileUploadDirectory] = useState<string | null>(null);
    const [fileSystemEntriesInfo, setFileSystemEntriesInfo] = React.useState<FileSystemEntryInfoDTO[]>([])

    useEffect(() => {
        refreshFileSystemEntriesInfo();
    }, [])

    const refreshFileSystemEntriesInfo = async () => {
        const response = await getFileSystemEntriesInfo();
        if (response.error) {
            //TODO: handle error
        }
        if (response.data) {
            setFileSystemEntriesInfo(response.data)
        }
        //TODO: function to load only uploaded and updated files after refresh??
    }

    return (
        <>
            <h2>Przesłane pliki</h2>
            <FileSystemEntryInfoList
                fileSystemEntriesInfoDTO={fileSystemEntriesInfo}
                setFileUploadCardVisible={setFileUploadCardVisible}
                setFileUploadDirectory={setFileUploadDirectory}
            />
            <button onClick={() => {
                setFileUploadCardVisible(true);
                setFileUploadDirectory(null);
            }}>
                Upload to root
            </button>
            <button onClick={() => {
                setDirectoryCreateCardVisible(true);
            }}>
                Create directories
            </button>
            {fileUploadCardVisible ? (
                <FileUploadPopup
                    uuid={fileUploadDirectory}
                    setFileUploadCardVisible={setFileUploadCardVisible}
                    fileRefreshFunction={refreshFileSystemEntriesInfo}
                />
            ) : ("")}
            {directoryCreateCardVisible ? (
                <DirectoryNameSetCard
                    setDirectoryCreateCardVisible={setDirectoryCreateCardVisible}
                    fileRefreshFunction={refreshFileSystemEntriesInfo}
                />
            ) : ("")}
        </>
    )
}

export default UploadedFilesTab
