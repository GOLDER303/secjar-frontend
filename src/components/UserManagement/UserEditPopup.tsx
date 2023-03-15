import React, {useEffect} from "react"
import "../../css/FileUploadPopup.css"
import UserPatchRequestDTO from "../../ts/interfaces/UserPatchRequestDTO"

interface UserEditPopupProps {
    handleUserEdit: (userPatchRequestDTO: UserPatchRequestDTO) => void
    closePopup: () => void
    getUserEditPopupData: () => UserPatchRequestDTO | null
}

const UserEditPopup: React.FC<UserEditPopupProps> = ({ handleUserEdit, closePopup, getUserEditPopupData }) => {
    const [fileDeletionDelay, setFileDeletionDelay] = React.useState<number | null>(null)
    const [desiredSessionTime, setDesiredSessionTime] = React.useState<number | null>(null)
    const [allowedDiskSpace, setAllowedDiskSpace] = React.useState<number | null>(null)

    const fileDeletionDelayMinutes = fileDeletionDelay && Math.round(fileDeletionDelay / 3600_000 / 24) || 0
    const desiredSessionTimeMinutes = desiredSessionTime && Math.round(desiredSessionTime / 60_000) || 0
    const allowedDiskSpaceMegabytes = allowedDiskSpace && Math.round(allowedDiskSpace / 1024 / 1024) || 0

    useEffect(() => {
        const placeholderData = getUserEditPopupData()
        if (placeholderData){
            setFileDeletionDelay(placeholderData.fileDeletionDelay)
            setDesiredSessionTime(placeholderData.desiredSessionTime)
            setAllowedDiskSpace(placeholderData.allowedDiskSpace)
        }
    }, [])
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
                        min={0}
                        required
                        type="number"
                        value={fileDeletionDelayMinutes}
                        onChange={(e) => setFileDeletionDelay(e.target.value ? parseInt(e.target.value) * 60_000 : null)}
                    />
                    dni
                </label>
                <br />
                <label>
                    Okres oczekiwanej sesji użytkownika:
                    <input
                        min={0}
                        required
                        type="number"
                        value={desiredSessionTimeMinutes}
                        onChange={(e) => setDesiredSessionTime(e.target.value ? parseInt(e.target.value) * 60_000 : null)}
                    />
                    minut
                </label>
                <br />
                <label>
                    Wielkość przestrzeni dysku:
                    <input
                        min={0}
                        required
                        type="number"
                        value={allowedDiskSpaceMegabytes}
                        onChange={(e) => setAllowedDiskSpace(e.target.value ? parseInt(e.target.value) * 1024 * 1024 : null)}
                    />
                    MB
                </label>
                <br />
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
