import React, {useState} from "react"
import { useEffect } from "react"
import FileSystemEntryInfoList from "../../../components/FileSystemEntryInfoList"
import { getFileSystemEntriesInfo } from "../../../services/FileSystemEntryInfoService"
import FileSystemEntryInfoDTO from "../../../ts/interfaces/FileSystemEntryInfoDTO"
import FileUploadCard from "../../../components/FileUploadCard"

const UploadedFilesTab: React.FC = () => {
    const [fileUploadCardVisible, setFileUploadCardVisible] = useState(false);
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
                    fileRefreshFunction={refreshFileSystemEntriesInfo}
                />
            ) : ("")}
        </>
    )
}

export default UploadedFilesTab
