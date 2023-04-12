import React, { useState } from "react"
import "../../css/GenericPopup.css"
import { uploadFile } from "../../services/FileSystemEntryInfoService"

interface FileUploadPopupProps {
    targetDirUuid: string | undefined
    fileUploadCallback: () => void
    closePopup: () => void
}

const FileUploadPopup: React.FC<FileUploadPopupProps> = ({ fileUploadCallback, closePopup, targetDirUuid }) => {
    const [fileToUpload, setFileToUpload] = useState<File | null>(null)

    const handleSubmit = async () => {
        if (fileToUpload != null) {
            const response = await uploadFile(fileToUpload, false, targetDirUuid)
            fileUploadCallback()

            closePopup()
        }
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
                    <input type="submit" />
                    <button
                        type="submit"
                        onClick={closePopup}
                    >
                        Zamknij
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FileUploadPopup
