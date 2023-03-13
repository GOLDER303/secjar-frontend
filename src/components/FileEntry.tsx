import React from "react";
import ApiFileResponseDTO from "../ts/interfaces/ApiFileResponseDTO";
import FileDirectory from "./FileDirectory";

interface FileEntryProps {
    data: ApiFileResponseDTO
}

function getBaseLog(base : number, val: number) {
    return Math.log(val) / Math.log(base);
}
const sizeUnits = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"]
const FileEntry : React.FC<FileEntryProps> = ({data}) => {
    let sizeScale = data.size != 0 ? Math.floor(getBaseLog(1024, data.size)) : 0;
    sizeScale = Math.min(sizeScale, 6);
    let sizeValue = Math.floor(100*data.size/Math.pow(1024, sizeScale))/100;
    let sizeUnit = sizeUnits[sizeScale];
    let typeOfContent : string;
    switch (data.contentType){
        case "text/plain":
            typeOfContent = "txt";
            break;
        case "directory":
            typeOfContent = "directory";
            break;
        default:
            typeOfContent = data.contentType;
    }

    return (
        (typeOfContent == "directory")
            // ? <FileDirectory children={data.children}/>
            ? <FileDirectory data={data} />
            : <div>
                <p>{data.name}.{typeOfContent} owned by {data.uuid}</p>
                <span>size: {sizeValue} {sizeUnit} </span>
                <span>Last update{data.deleteDate ? <> on {data.deleteDate}</> : ": never"}</span>
            </div>
    )
}

export default FileEntry;