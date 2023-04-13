import React, { useRef, useState } from "react"
import "../../css/FileUploadPopup.css"
import { patchFile } from "../../services/FileSystemEntryInfoService"
import FileSystemEntryInfoDTO from "../../ts/interfaces/FileSystemEntryInfoDTO"

interface FileMovePopupProps {
    targetFileUuid: string
    fileSystemEntriesInfos: FileSystemEntryInfoDTO[]
    closePopup: () => void
    fileMoveCallback: () => void
}

const FileMovePopup: React.FC<FileMovePopupProps> = ({ targetFileUuid, fileSystemEntriesInfos, closePopup, fileMoveCallback }) => {
    const targetDirSelectRef = useRef<HTMLSelectElement>(null)
    const [errorMessage, setErrorMessage] = useState("")

    const getAllDirectories = (fileSystemEntriesInfosList: FileSystemEntryInfoDTO[]): FileSystemEntryInfoDTO[] => {
        const directories: FileSystemEntryInfoDTO[] = []
        for (const fileSystemEntryInfo of fileSystemEntriesInfosList) {
            if (fileSystemEntryInfo.contentType === "directory") {
                directories.push(fileSystemEntryInfo)
            }
            directories.push(...getAllDirectories(fileSystemEntryInfo.children))
        }
        return directories
    }

    const directoriesInfos = getAllDirectories(fileSystemEntriesInfos)

    const handleSubmit = async () => {
        if (!targetDirSelectRef.current) {
            return
        }

        const response = await patchFile(targetFileUuid, undefined, targetDirSelectRef.current.value)

        if (response.error) {
            setErrorMessage("Coś poszło nie tak")
        }

        fileMoveCallback()

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
                <select
                    name="targetDirUuid"
                    id="targetDirUuid"
                    ref={targetDirSelectRef}
                >
                    <option value="">Folder główny</option>
                    {directoriesInfos.map((directoryInfo) => (
                        <option value={directoryInfo.uuid}>{directoryInfo.name}</option>
                    ))}
                </select>
                {errorMessage && <p>{errorMessage}</p>}
                <button type="submit">Przenieś</button>
                <button onClick={closePopup}>Close</button>
            </form>
        </div>
    )
}

export default FileMovePopup
