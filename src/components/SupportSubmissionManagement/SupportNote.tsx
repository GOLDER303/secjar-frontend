import React, {useEffect} from "react"
import SupportSubmissionNoteDTO from "../../ts/interfaces/SupportSubmissionNoteDTO"

interface SupportNoteProps {
    supportSubmissionNoteDTO: SupportSubmissionNoteDTO
    handleNoteEdit: (uuid: string, content: string) => void
    handleNoteDelete: (uuid: string) => void
}

const SupportNote: React.FC<SupportNoteProps> = ({ supportSubmissionNoteDTO, handleNoteEdit, handleNoteDelete }) => {
    const [isNoteEdited, setIsNoteEdited] = React.useState(false)
    const [submissionNoteContent, setSubmissionNoteContent] = React.useState<string | null>(null)

    const editedNoteContent = submissionNoteContent || ""

    useEffect(() => {
        setSubmissionNoteContent(supportSubmissionNoteDTO.noteContent)
    }, [])

    const handleSubmit = () => {
        if (submissionNoteContent) {
            handleNoteEdit(supportSubmissionNoteDTO.uuid, submissionNoteContent)
            setIsNoteEdited(false)
        }
    }

    return (
        isNoteEdited ? (
            <tr>
                <td>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault()
                            handleSubmit()
                        }}
                    >
                        <textarea
                            name="content"
                            id="content"
                            value={editedNoteContent}
                            cols={30} rows={10}
                            onChange={(e) => {
                                setSubmissionNoteContent(e.target.value)
                            }}
                        />
                                <input type="submit" />
                                <button type="submit"
                                    onClick={() => {
                                        setIsNoteEdited(false)
                                    }}
                                >
                                    Anuluj edycję
                                </button>
                    </form>
                </td>
            </tr>
        ) : (
            <tr>
                <td>{supportSubmissionNoteDTO.noteContent}</td>
                <td>
                    <button
                        onClick={() => {
                            setIsNoteEdited(true)
                        }}
                    >
                        Edytuj notatkę
                    </button>
                    <button
                        onClick={() => {
                            handleNoteDelete(supportSubmissionNoteDTO.uuid)
                        }}
                    >
                        Usuń notatkę
                    </button>
                </td>
            </tr>
        )
    )
}

export default SupportNote
