import React, {useEffect, useState} from "react";
import ApiFileResponseDTO from "../ts/interfaces/ApiFileResponseDTO";
import FileEntry from "./FileEntry";

interface FileDirectoryProps {
    data: ApiFileResponseDTO
}

const FileDirectory : React.FC<FileDirectoryProps> = ({data}) => {
    const [fileArray, setFileArray] = useState([<></>]);
    const [showFileArray, setShowFileArray] = useState(false);
    if (data.children.length == 0){
        return (<div className="directory">empty directory</div>)
    }
    else{
        useEffect(() => {
            setFileArray(data.children.map((val) => {
                return <FileEntry data={val}/>
            }));
        }, [])
        return <div className="directory"><div>
            <p>{data.name} owned by {data.uuid}</p>
            <span>Last update{data.deleteDate ? <> on {data.deleteDate}</> : ": never"} </span>
        </div>
            <div onClick={() => {setShowFileArray(!showFileArray)}}>{showFileArray ? <>▼ <>{fileArray}</></> : "► "}</div></div>
    }
}

export default FileDirectory