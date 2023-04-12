import React, { useRef } from "react"
import { createDirectory } from "../../services/CreateDirectoryService"

interface DirectoryCreatePopupProps {
    parenDirectoryUuid: string | undefined
    closePopup: () => void
    directoryCreateCallback: () => void
}

const DirectoryCreatePopup: React.FC<DirectoryCreatePopupProps> = ({ parenDirectoryUuid, closePopup, directoryCreateCallback }) => {
    const directoryNameInputRev = useRef<HTMLInputElement>(null)

    const handleSubmit = async () => {
        if (!directoryNameInputRev.current) {
            return
        }

        await createDirectory(directoryNameInputRev.current.value, parenDirectoryUuid)
        directoryCreateCallback()
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
                        type="text"
                        ref={directoryNameInputRev}
                    />
                    <label htmlFor="directoryName">Nazwa folderu: </label>
                </div>
                <div className="buttons">
                    <button onClick={() => closePopup()}>Annuluj</button>
                    <button type="submit">Zatwierdź</button>
                </div>
            </form>
        </div>
    )
}

export default DirectoryCreatePopup
