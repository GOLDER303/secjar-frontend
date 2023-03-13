import React, {ReactElement, useEffect, useState} from "react";
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO";
import FileSystemEntryInfo from "./FileSystemEntryInfo";

interface FileDirectoryProps {
    fileSystemEntryInfoDTO: FileSystemEntryInfoDTO,
    setFileUploadCardVisible: (param: boolean) => void,
    setFileUploadDirectory: (param: string) => void
}

const FileDirectory : React.FC<FileDirectoryProps> = ({ fileSystemEntryInfoDTO, setFileUploadCardVisible, setFileUploadDirectory }) => {
    const [fileArray, setFileArray] = React.useState<Array<ReactElement<any, any>> | null>(null);
    const [showFileArray, setShowFileArray] = useState(false);
    if (fileSystemEntryInfoDTO.children.length == 0){
        return (<div className="directory">empty directory</div>)
    }
    else{
        useEffect(() => {
            setFileArray(fileSystemEntryInfoDTO.children.map((val) => {
                return <FileSystemEntryInfo
                    fileSystemEntryInfoDTO={val}
                    setFileUploadCardVisible={(isVisible : boolean) => {setFileUploadCardVisible(isVisible)}}
                    setFileUploadDirectory={(directory : string) => {setFileUploadDirectory(directory)}}
                />
            }));
        }, [])
        return (
            <div className="directory" key={fileSystemEntryInfoDTO.id}>
                <div>
                    <p>{fileSystemEntryInfoDTO.name} owned by {fileSystemEntryInfoDTO.uuid}</p>
                    <span>Last update{fileSystemEntryInfoDTO.deleteDate ? <> on {fileSystemEntryInfoDTO.deleteDate}</> : ": never"} </span>
                </div>
                <div onClick={() => {setShowFileArray(!showFileArray)}}>
                    {showFileArray ? <>▼ <>{fileArray}</></> : "► "}
                </div>
                <button onClick={
                    () => {
                        setFileUploadCardVisible(true);
                        setFileUploadDirectory(fileSystemEntryInfoDTO.uuid);
                    }
                }>Upload here</button>
            </div>
        )
    }
}

export default FileDirectory