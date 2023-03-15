import React from "react"
import SupportSubmissionDTO from "../../ts/interfaces/SupportSubmissionDTO"
import SupportSubmission from "./SupportSubmission"

interface UserInfoListProps {
    supportSubmissionDTO: SupportSubmissionDTO[]
    openAddNotePopup: () => void
    openReadNotesSidePanel: () => void
    setSupportSubmissionTarget: (param: string) => void
    handleSubmissionClose: () => void
}

const SupportSubmissionList: React.FC<UserInfoListProps> = ({ supportSubmissionDTO, openAddNotePopup, openReadNotesSidePanel, setSupportSubmissionTarget, handleSubmissionClose }) => {
    return (
        <table>
            <tr>
                <th colSpan={2}>Zgłaszający</th>
                <th>Dane kontaktowe</th>
                <th>Zawartość zgłoszenia</th>
                <th>Ilość notatek</th>
            </tr>
            {supportSubmissionDTO.map((supportSubmission) => {
                return (
                    <SupportSubmission
                        supportSubmissionDTO={supportSubmission}
                        openAddNotePopup={openAddNotePopup}
                        openReadNotesSidePanel={openReadNotesSidePanel}
                        setSupportSubmissionTarget={setSupportSubmissionTarget}
                        handleSubmissionClose={handleSubmissionClose}
                    />
                )
            })}
        </table>
    )
}

export default SupportSubmissionList
