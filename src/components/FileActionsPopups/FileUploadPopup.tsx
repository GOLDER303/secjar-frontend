import React, { useState } from "react"
import { UserInfoContext, UserInfoContextType } from "../../contexts/UserInfoContext"
import "../../css/FileUploadPopup.css"
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

        if (userInfoDTO.allowedDiscSpace - userInfoDTO.currentDiscSpace < fileToUpload.size) {
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
        <div className="file-upload-popup">
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
                <input type="submit" />
                <button
                    type="submit"
                    onClick={closePopup}
                >
                    Close
                </button>
            </form>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    )
}

export default FileUploadPopup
