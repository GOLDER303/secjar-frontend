import React from "react"
import SupportSubmissionNoteDTO from "../../ts/interfaces/SupportSubmissionNoteDTO"
import SupportNote from "./SupportNote"

interface SupportNoteListProps {
    supportSubmissionNoteDTO: SupportSubmissionNoteDTO[]
    handleNoteEdit: (uuid: string, content: string) => void
    handleNoteDelete: (uuid: string) => void
}

const SupportNoteList: React.FC<SupportNoteListProps> = ({ supportSubmissionNoteDTO, handleNoteEdit, handleNoteDelete }) => {
    return (
        <table>
            <tr>
                <th>Zawartość notatki</th>
                <th>Akcje</th>
            </tr>
            {supportSubmissionNoteDTO.map((supportSubmissionNoteD) => {
                return (
                    <SupportNote
                        supportSubmissionNoteDTO={supportSubmissionNoteD}
                        handleNoteEdit={handleNoteEdit}
                        handleNoteDelete={handleNoteDelete}
                    />
                )
            })}
        </table>
    )
}

export default SupportNoteList
