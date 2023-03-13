import React, {useState} from "react"
import { useEffect } from "react"
import FileSystemEntryInfoList from "../../../components/FileSystemEntryInfoList"
import { getFileSystemEntriesInfo } from "../../../services/FileSystemEntryInfoService"
import FileSystemEntryInfoDTO from "../../../ts/interfaces/FileSystemEntryInfoDTO"
import FileUploadCard from "../../../components/FileUploadCard";

const UploadedFilesTab: React.FC = () => {
    const [fileUploadCardVisible, setFileUploadCardVisible] = useState(false);
    const [fileUploadDirectory, setFileUploadDirectory] = useState<string | null>(null);
    const [fileSystemEntriesInfo, setFileSystemEntriesInfo] = React.useState<FileSystemEntryInfoDTO[]>([])

    useEffect(() => {
        getFileSystemEntriesInfo().then((getFileSystemEntriesInfoResponse) => {
            if (getFileSystemEntriesInfoResponse.error) {
                //TODO: handle error
            }
            if (getFileSystemEntriesInfoResponse.data) {
                setFileSystemEntriesInfo(getFileSystemEntriesInfoResponse.data)
            }
        })
    }, [])
    return (
        <>
            <h2>Przesłane pliki</h2>
            <FileSystemEntryInfoList
                fileSystemEntriesInfoDTO={fileSystemEntriesInfo}
                setFileUploadCardVisible={(isVisible : boolean) => {setFileUploadCardVisible(isVisible)}}
                setFileUploadDirectory={(directory : string) => {setFileUploadDirectory(directory)}}
            />
            <button onClick={() => {
                setFileUploadCardVisible(true);
                setFileUploadDirectory(null);
            }}>
                Upload to root
            </button>
            {fileUploadCardVisible ? (
                <FileUploadCard
                    uuid={fileUploadDirectory}
                    setFileUploadCardVisible={(isVisible: boolean) => {setFileUploadCardVisible(isVisible)}}
                />
            ) : ("")}
        </>
    )
}

export default UploadedFilesTab
