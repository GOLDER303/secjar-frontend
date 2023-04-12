import React, { useRef } from "react"
import "../../css/GenericPopup.css"
import { patchFile } from "../../services/FileSystemEntryInfoService"
import FileSystemEntryInfoDTO from "../../ts/interfaces/FileSystemEntryInfoDTO"

interface FileMovePopupProps {
    targetFileUuid: string
    fileSystemEntriesInfos: FileSystemEntryInfoDTO[]
    closePopup: () => void
    fileMoveCallback: () => void
}

const FileMovePopup: React.FC<FileMovePopupProps> = ({ targetFileUuid, fileSystemEntriesInfos, closePopup, fileMoveCallback }) => {
    const targetDirInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async () => {
        if (!targetDirInputRef.current) {
            return
        }

        let targetDirUuid = ""
        if (targetDirInputRef.current.value != "") {
            targetDirUuid = fileSystemEntriesInfos.filter((fileSystemEntryInfo) => fileSystemEntryInfo.name == targetDirInputRef.current!.value)[0].uuid
        }

        const response = await patchFile(targetFileUuid, undefined, targetDirUuid)
        fileMoveCallback()

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
                <div className="inputBox">
                    <input
                        placeholder=" "
                        type="string"
                        name="targetDirUuid"
                        id="targetDirUuid"
                        ref={targetDirInputRef}
                    />
                    <label htmlFor="targetDirUuid">Gdzie chcesz przenieść plik?</label>
                </div>
                <div className="buttons">
                    <button type="submit">Przenieś</button>
                    <button onClick={closePopup}>Zamknij</button>
                </div>
            </form>
        </div>
    )
}

export default FileMovePopup
