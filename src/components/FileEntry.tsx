import React from "react";
import ApiFileResponseDTO from "../ts/interfaces/ApiFileResponseDTO";
import FileDirectory from "./FileDirectory";

interface FileEntryProps {
    data: ApiFileResponseDTO,
    setFileUploadCardVisible: (param: boolean) => void,
    setFileUploadDirectory: (param: string) => void
}

function getBaseLog(base : number, val: number) {
    return Math.log(val) / Math.log(base);
}
const sizeUnits = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"]
const FileEntry : React.FC<FileEntryProps> = (props) => {
    let sizeScale = props.data.size != 0 ? Math.floor(getBaseLog(1024, props.data.size)) : 0;
    sizeScale = Math.min(sizeScale, 6);
    let sizeValue = Math.floor(100*props.data.size/Math.pow(1024, sizeScale))/100;
    let sizeUnit = sizeUnits[sizeScale];
    let typeOfContent : string;
    switch (props.data.contentType){
        case "text/plain":
            typeOfContent = "txt";
            break;
        case "directory":
            typeOfContent = "directory";
            break;
        default:
            typeOfContent = props.data.contentType;
    }

    return (
        (typeOfContent == "directory")
            ? <FileDirectory key={props.data.id}
                data={props.data}
                setFileUploadCardVisible={(isVisible : boolean) => {props.setFileUploadCardVisible(isVisible)}}
                setFileUploadDirectory={(directory : string) => {props.setFileUploadDirectory(directory)}}
            />
            : <div>
                <p>{props.data.name}.{typeOfContent} owned by {props.data.uuid}</p>
                <span>size: {sizeValue} {sizeUnit} </span>
                <span>Last update{props.data.deleteDate ? <> on {props.data.deleteDate}</> : ": never"}</span>
            </div>
    )
}

export default FileEntry;