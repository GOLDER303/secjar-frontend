import React, { useRef, useState } from "react"
import "../css/FileUploadPopup.css"

interface FileMovePopupProps {
    handleFileMove: (fileUuid: string, targetDirUuid: string) => void
    closePopup: () => void
    targetFileUuid: string
}

const FileMovePopup: React.FC<FileMovePopupProps> = ({ handleFileMove, closePopup, targetFileUuid }) => {
    const targetDirInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = () => {
        if (!targetDirInputRef.current) {
            return
        }
        handleFileMove(targetFileUuid, targetDirInputRef.current.value)
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
                <label htmlFor="targetDirUuid">Gdzie chcesz przenieść plik?</label>
                <input
                    type="string"
                    name="targetDirUuid"
                    id="targetDirUuid"
                    ref={targetDirInputRef}
                />
                <button type="submit">Przenieś</button>
                <button onClick={closePopup}>Close</button>
            </form>
        </div>
    )
}

export default FileMovePopup
