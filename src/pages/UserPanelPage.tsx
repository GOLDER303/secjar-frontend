import React, {ReactElement, useEffect, useState} from "react"
import { Link } from "react-router-dom"
import { IsLoggedInContext, IsLoggedInContextType } from "../contexts/IsLoggedInContext"
import FileEntry from "../components/FileEntry";
import {getMyFiles} from "../services/FileSystemEntryInfoService";
import FileSystemEntryInfo from "../ts/interfaces/FileSystemEntryInfo";
import FileUploadCard from "../components/FileUploadCard";

const UserPanelPage: React.FC = () => {
    const { isUserLoggedIn } = React.useContext(IsLoggedInContext) as IsLoggedInContextType;
    const [fileArray, setFileArray] = React.useState<Array<ReactElement<any, any>> | null>(null);
    const [fileUploadCardVisible, setFileUploadCardVisible] = useState(false);
    const [fileUploadDirectory, setFileUploadDirectory] = useState<string | null>(null);
    let filesData : [FileSystemEntryInfo];

    useEffect(() => {
        getMyFiles().then((fileData) => {
            if (fileData.error) {
                console.log("fileData error")
            }
            if (fileData.data) {
                filesData = fileData.data;
                setFileArray(filesData.map((val) => {
                    return <FileEntry key={val.id}
                            data={val}
                            setFileUploadCardVisible={(isVisible : boolean) => {setFileUploadCardVisible(isVisible)}}
                            setFileUploadDirectory={(directory : string) => {setFileUploadDirectory(directory)}}
                    />
                }));
            }
        });
    }, [])

    const showFileUploadCard = (visible: boolean, directory: string | null) => {
        if (visible) {
            return (
                <FileUploadCard
                    uuid={directory}
                    setFileUploadCardVisible={(isVisible: boolean) => {setFileUploadCardVisible(isVisible)}}
                />
            )
        }else{
            return <></>
        }
    }

    const showPage = () => {
        return (
            <>
                {fileArray
                    ? <div>
                        <div>{fileArray}</div>
                        <button onClick={() => {
                            setFileUploadCardVisible(true);
                            setFileUploadDirectory(null);
                        }}>Upload to root</button>
                </div>
                    : <p>There is no files present. Try to upload a file.</p>}
            </>
        )
    }

    return (
        <>
            <h1>User Panel Page</h1>
            {isUserLoggedIn
                ? <>
                    <h2>Hello</h2><br />
                    {showPage()}
                    {showFileUploadCard(fileUploadCardVisible, fileUploadDirectory)}
                </>
                : <h2>You need to <Link to={"/login"}>login</Link> first</h2>}

        </>
    )
}

export default UserPanelPage
