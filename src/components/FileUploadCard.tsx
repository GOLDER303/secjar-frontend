import React, {useState} from "react";
import {fileUpload} from "../services/FileSystemEntryInfoService";

interface FileUploadCardProps {
    uuid: string | null,
    setFileUploadCardVisible: (param: boolean) => void
}


const FileUploadCard : React.FC<FileUploadCardProps> = (props) => {
    const [fileToUpload, setFileToUpload] = useState<File | null>(null);

    const uploadFile = async () => {
        const response = await fileUpload(fileToUpload, false, props.uuid);
        if (response){
            console.log(response);
        }else{
            console.log("file is null");
        }
    }
    let closing = false;
    return (
        <div>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    if (closing) {
                        props.setFileUploadCardVisible(false)
                    }else {
                        uploadFile();
                    }
                }}
            >
                <input type="file" onChange={e => setFileToUpload(e.target.files ? e.target.files[0] : null)}/>
                <input type="submit" />
                <button type="submit" onClick={() => closing = true}>Close</button>
            </form>
        </div>
    )
}

export default FileUploadCard;