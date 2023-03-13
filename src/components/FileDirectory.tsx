import React, {ReactElement, useEffect, useState} from "react";
import FileSystemEntryInfo from "../ts/interfaces/FileSystemEntryInfo";
import FileEntry from "./FileEntry";

interface FileDirectoryProps {
    fileSystemEntryInfo: FileSystemEntryInfo,
    setFileUploadCardVisible: (param: boolean) => void,
    setFileUploadDirectory: (param: string) => void
}

const FileDirectory : React.FC<FileDirectoryProps> = (props) => {
    const [fileArray, setFileArray] = React.useState<Array<ReactElement<any, any>> | null>(null);
    const [showFileArray, setShowFileArray] = useState(false);
    if (props.fileSystemEntryInfo.children.length == 0){
        return (<div className="directory">empty directory</div>)
    }
    else{
        useEffect(() => {
            setFileArray(props.fileSystemEntryInfo.children.map((val) => {
                return <FileEntry
                    key={val.id}
                    fileSystemEntryInfo={val}
                    setFileUploadCardVisible={(isVisible : boolean) => {props.setFileUploadCardVisible(isVisible)}}
                    setFileUploadDirectory={(directory : string) => {props.setFileUploadDirectory(directory)}}
                />
            }));
        }, [])
        return <div className="directory"><div>
            <p>{props.fileSystemEntryInfo.name} owned by {props.fileSystemEntryInfo.uuid}</p>
            <span>Last update{props.fileSystemEntryInfo.deleteDate ? <> on {props.fileSystemEntryInfo.deleteDate}</> : ": never"} </span>
        </div>
            <div onClick={() => {setShowFileArray(!showFileArray)}}>
                {showFileArray ? <>▼ <>{fileArray}</></> : "► "}
            </div>

            <button onClick={
                () => {
                    props.setFileUploadCardVisible(true);
                    props.setFileUploadDirectory(props.fileSystemEntryInfo.uuid);
                }
            }>Upload here</button>
        </div>
    }
}

export default FileDirectory