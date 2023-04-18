import React from "react"
import SupportSubmissionDTO from "../../ts/interfaces/SupportSubmissionDTO"
import ContentEditable from "react-contenteditable";

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
            <td className="scrollable wrap">
                <ContentEditable
                    html={supportSubmissionDTO.message}
                    onChange={() => {}}
                    disabled
                />
            </td>
            <td className="number">{supportSubmissionDTO.notes && supportSubmissionDTO.notes.length}</td>
            <td>
                <div className="table-buttons">
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
                </div>
            </td>
        </tr>
    )
}

export default SupportSubmission
