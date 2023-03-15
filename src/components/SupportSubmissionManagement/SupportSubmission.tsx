import React from "react"
import SupportSubmissionDTO from "../../ts/interfaces/SupportSubmissionDTO"

interface SupportSubmissionProps {
    supportSubmissionDTO: SupportSubmissionDTO
    openAddNotePopup: () => void
    openReadNotesSidePanel: () => void
    setSupportSubmissionTarget: (param: string) => void
    handleSubmissionClose: () => void
}

const SupportSubmission: React.FC<SupportSubmissionProps> = ({ supportSubmissionDTO, openAddNotePopup, openReadNotesSidePanel, setSupportSubmissionTarget, handleSubmissionClose }) => {
    return (
        <tr>
            <td>{supportSubmissionDTO.name}</td>
            <td>{supportSubmissionDTO.surname}</td>
            <td>{supportSubmissionDTO.email}</td>
            <td>{supportSubmissionDTO.message}</td>
            <td>{supportSubmissionDTO.notes && supportSubmissionDTO.notes.length}</td>
            <td>
                <button
                    onClick={() => {
                        openAddNotePopup()
                        setSupportSubmissionTarget(supportSubmissionDTO.uuid)
                    }}
                >
                    Dodaj notatkę
                </button>
                <button
                    onClick={() => {
                        openReadNotesSidePanel()
                        setSupportSubmissionTarget(supportSubmissionDTO.uuid)
                    }}
                >
                    Czytaj notatki
                </button>
                <button
                    onClick={() => {
                        handleSubmissionClose()
                        setSupportSubmissionTarget(supportSubmissionDTO.uuid)
                    }}
                >
                    Zamknij zgłoszenie
                </button>
            </td>
        </tr>
    )
}

export default SupportSubmission
