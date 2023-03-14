import React from "react"
import "../css/FileUploadPopup.css"
import UserPatchRequestDTO from "../ts/interfaces/UserPatchRequestDTO"

interface UserEditPopupProps {
    handleUserEdit: (userPatchRequestDTO: UserPatchRequestDTO) => void
    closePopup: () => void
}

const UserEditPopup: React.FC<UserEditPopupProps> = ({ handleUserEdit, closePopup }) => {
    const [fileDeletionDelay, setFileDeletionDelay] = React.useState<number | null>(null)
    const [desiredSessionTime, setDesiredSessionTime] = React.useState<number | null>(null)
    const [allowedDiskSpace, setAllowedDiskSpace] = React.useState<number | null>(null)

    const handleSubmit = () => {
        if (fileDeletionDelay && desiredSessionTime && allowedDiskSpace) {
            const userPatchRequestDTO = {
                fileDeletionDelay: fileDeletionDelay,
                desiredSessionTime: desiredSessionTime,
                allowedDiskSpace: allowedDiskSpace,
            } as UserPatchRequestDTO
            handleUserEdit(userPatchRequestDTO)
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
                <label>
                    Okres usunięcia pliku po przeniesieniu do kosza:
                    <input
                        required
                        type="number"
                        onChange={(e) => setFileDeletionDelay(e.target.value ? parseInt(e.target.value) * 3600 * 24 : null)}
                    /> dni
                </label><br />
                <label>
                    Okres oczekiwanej sesji użytkownika:
                    <input
                        required
                        type="number"
                        onChange={(e) => setDesiredSessionTime(e.target.value ? parseInt(e.target.value) * 3600 * 24 : null)}
                    /> dni
                </label><br />
                <label>
                    Wielkość przestrzeni dysku:
                    <input
                        required
                        type="number"
                        onChange={(e) => setAllowedDiskSpace(e.target.value ? parseInt(e.target.value) * 1024 * 1024 : null)}
                    /> MB
                </label><br />
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

export default UserEditPopup
