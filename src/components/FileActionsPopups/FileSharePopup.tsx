import React, { useRef, useState } from "react"
import "../../css/FileUploadPopup.css"
import { shareFileSystemEntry } from "../../services/FileSystemEntryInfoService"

interface FileMovePopupProps {
    targetFileUuid: string
    closePopup: () => void
}

const FileSharePopup: React.FC<FileMovePopupProps> = ({ targetFileUuid, closePopup }) => {
    const shareAction = useRef<HTMLSelectElement>(null)

    const [shareLink, setShareLink] = useState("")

    const handleSubmit = async () => {
        if (!shareAction.current) {
            return
        }

        switch (shareAction.current.value) {
            case "LINK_SHARE":
                await shareFileSystemEntry([targetFileUuid], "SHARE_START", "LINK_SHARE")
                setShareLink(`localhost:8080/fileSystemEntries/${targetFileUuid}`)
                break

            case "STOP":
                await shareFileSystemEntry([targetFileUuid], "SHARE_STOP", "LINK_SHARE")
                break

            default:
                break
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
                <label htmlFor="shareType">Co chcesz zrobić? </label>
                <select
                    name="shareType"
                    id="shareType"
                    ref={shareAction}
                >
                    <option value="LINK_SHARE">Udostępnij przez link</option>
                    <option value="STOP">Przestań udostępniać</option>
                </select>
                <button type="submit">Zatwierdź</button>
                <button onClick={closePopup}>Zamknij</button>
            </form>
            <br />
            {shareLink && <div>Link: {shareLink}</div>}
        </div>
    )
}

export default FileSharePopup
