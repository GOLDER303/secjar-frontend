import React from "react";
import ApiFileResponseDTO from "../ts/interfaces/ApiFileResponseDTO";

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
        default:
            typeOfContent = data.contentType;
    }

    return (
        <div>
            <p>{data.name}.{typeOfContent} owned by {data.uuid}</p>
            <span>size: {sizeValue} {sizeUnit} </span>
            <span>Last update on {data.deleteDate} </span>
        </div>
    )
}

export default FileEntry;