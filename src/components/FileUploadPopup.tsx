import React, { useState } from "react"
import "../css/FileUploadPopup.css"

interface FileUploadPopupProps {
    handleFileUpload: (fileToUpload: File) => void
    closePopup: () => void
}

const FileUploadPopup: React.FC<FileUploadPopupProps> = ({ handleFileUpload, closePopup }) => {
    const [fileToUpload, setFileToUpload] = useState<File | null>(null)

    const handleSubmit = () => {
        if (fileToUpload != null) {
            handleFileUpload(fileToUpload)
            closePopup()
        }
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
        </div>
    )
}

export default FileUploadPopup
