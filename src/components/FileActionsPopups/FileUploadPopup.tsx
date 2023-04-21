import React, { useState } from "react"
import { UserInfoContext, UserInfoContextType } from "../../contexts/UserInfoContext"
import "../../css/GenericPopup.css"
import { uploadFile } from "../../services/FileSystemEntryInfoService"

interface FileUploadPopupProps {
    targetDirUuid: string | undefined
    fileUploadCallback: () => void
    closePopup: () => void
}

const FileUploadPopup: React.FC<FileUploadPopupProps> = ({ fileUploadCallback, closePopup, targetDirUuid }) => {
    const [fileToUpload, setFileToUpload] = useState<File | null>(null)
    const [errorMessage, setErrorMessage] = useState("")
    const { userInfoDTO } = React.useContext(UserInfoContext) as UserInfoContextType

    const handleSubmit = async () => {
        if (!fileToUpload || !userInfoDTO) {
            return
        }
        console.log(userInfoDTO.allowedDiscSpace - userInfoDTO.currentDiscSpace)
        console.log("size: " + fileToUpload.size)
        if (userInfoDTO.allowedDiscSpace - userInfoDTO.currentDiscSpace < fileToUpload.size) {
            console.log("inside")
            setErrorMessage("Nie masz wystarczającej ilości miejsca na dysku")
            return
        }

        const response = await uploadFile(fileToUpload, false, targetDirUuid)

        if (response.error) {
            setErrorMessage("Coś poszło nie tak")
        }

        fileUploadCallback()

        closePopup()
    }

    return (
        <div className="popup">
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    handleSubmit()
                }}
            >
                <input
                    type="file"
                    onChange={(e) => setFileToUpload(e.target.files ? e.target.files[0] : null)}
                />
                <div className="buttons">
                    <input
                        type="submit"
                        value="Prześlij"
                    />
                    <button
                        type="submit"
                        onClick={closePopup}
                    >
                        Zamknij
                    </button>
                </div>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    )
}

export default FileUploadPopup
