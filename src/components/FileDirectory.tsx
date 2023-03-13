import React, {ReactElement, useEffect, useState} from "react";
import FileSystemEntryInfo from "../ts/interfaces/FileSystemEntryInfo";
import FileEntry from "./FileEntry";

interface FileDirectoryProps {
    data: FileSystemEntryInfo,
    setFileUploadCardVisible: (param: boolean) => void,
    setFileUploadDirectory: (param: string) => void
}

const FileDirectory : React.FC<FileDirectoryProps> = (props) => {
    const [fileArray, setFileArray] = React.useState<Array<ReactElement<any, any>> | null>(null);
    const [showFileArray, setShowFileArray] = useState(false);
    if (props.data.children.length == 0){
        return (<div className="directory">empty directory</div>)
    }
    else{
        useEffect(() => {
            setFileArray(props.data.children.map((val) => {
                return <FileEntry key={val.id}
                    data={val}
                    setFileUploadCardVisible={(isVisible : boolean) => {props.setFileUploadCardVisible(isVisible)}}
                    setFileUploadDirectory={(directory : string) => {props.setFileUploadDirectory(directory)}}
                />
            }));
        }, [])
        return <div className="directory"><div>
            <p>{props.data.name} owned by {props.data.uuid}</p>
            <span>Last update{props.data.deleteDate ? <> on {props.data.deleteDate}</> : ": never"} </span>
        </div>
            <div onClick={() => {setShowFileArray(!showFileArray)}}>
                {showFileArray ? <>▼ <>{fileArray}</></> : "► "}
            </div>

            <button onClick={
                () => {
                    props.setFileUploadCardVisible(true);
                    props.setFileUploadDirectory(props.data.uuid);
                }
            }>Upload here</button>
        </div>
    }
}

export default FileDirectory