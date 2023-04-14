import React, {useEffect} from "react"
import "../../css/GenericPopup.css"
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

    const fileDeletionDelayDays = fileDeletionDelay != null && Math.round(fileDeletionDelay / 3600_000 / 24) || undefined
    const desiredSessionTimeMinutes = desiredSessionTime != null && Math.round(desiredSessionTime / 60_000) || undefined
    const allowedDiskSpaceMegabytes = allowedDiskSpace != null && Math.round(allowedDiskSpace / 1024 / 1024) || undefined

    useEffect(() => {
        const placeholderData = getUserEditPopupData()
        if (placeholderData){
            setFileDeletionDelay(placeholderData.fileDeletionDelay || null)
            setDesiredSessionTime(placeholderData.desiredSessionTime || null)
            setAllowedDiskSpace(placeholderData.allowedDiskSpace || null)
        }
    }, [])

    const handleSubmit = () => {
        if (fileDeletionDelay || desiredSessionTime || allowedDiskSpace) {
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
        <div className="popup">
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    handleSubmit()
                }}
            >
                <label>
                    Okres usunięcia pliku po przeniesieniu do kosza:
                    <input
                        min={1}
                        max={30}
                        type="number"
                        value={fileDeletionDelayDays}
                        onChange={(e) => setFileDeletionDelay(e.target.value ? parseInt(e.target.value) * 3600_000 * 24 : null)}
                    />
                    dni
                </label>
                <br />
                <label>
                    Okres oczekiwanej sesji użytkownika:
                    <input
                        min={0}
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
                        type="number"
                        value={allowedDiskSpaceMegabytes}
                        onChange={(e) => setAllowedDiskSpace(e.target.value ? parseInt(e.target.value) * 1024 * 1024 : null)}
                    />
                    MB
                </label>
                <br />
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

export default UserEditPopup
