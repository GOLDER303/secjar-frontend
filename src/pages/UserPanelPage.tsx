import React, {useEffect} from "react"
import { Link } from "react-router-dom"
import { IsLoggedInContext, IsLoggedInContextType } from "../contexts/IsLoggedInContext"
import FileEntry from "../components/FileEntry";
import {getMyFiles} from "../services/FileService";
import ApiFileResponseDTO from "../ts/interfaces/ApiFileResponseDTO";

const UserPanelPage: React.FC = () => {
    const { isUserLoggedIn } = React.useContext(IsLoggedInContext) as IsLoggedInContextType;
    const [filesArray, setFilesArray] = React.useState([<></>]);
    let filesData : [ApiFileResponseDTO];
    console.log(filesArray);

    useEffect(() => {
        getMyFiles().then((fileData) => {
            if (fileData.error) {
                console.log("fileData error")
            }
            if (fileData.data) {
                filesData = fileData.data;
                setFilesArray(filesData.map((val) => {
                    return <FileEntry data={val} />
                }));
            }
        });
        console.log(filesArray);
    }, [])

    const showPage = () => {
        return (
            <>
                {filesArray.length > 0 && filesArray[0] != <></>
                    ? filesArray
                    : <p>There is no files present. Try to upload a file.</p>}
            </>
        )
    }

    return (
        <>
            <h1>User Panel Page</h1>
            {isUserLoggedIn ? <><h2>Hello</h2>{showPage()}</>  : <h2>You need to <Link to={"/login"}>login</Link> first</h2>}

        </>
    )
}

export default UserPanelPage
