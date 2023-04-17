import React, {useEffect} from "react"
import SupportSubmissionNoteDTO from "../../ts/interfaces/SupportSubmissionNoteDTO"
import ContentEditable from "react-contenteditable"

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
                <td className="scrollable">
                    <form
                        id="SupportNoteEdit"
                        onSubmit={(event) => {
                            event.preventDefault()
                            handleSubmit()
                        }}
                    >
                        <div className="inputBox wrap" style={{marginTop: "0", marginBottom: "5px"}}>
                            <ContentEditable
                                html={editedNoteContent}
                                onChange={(e) => {
                                    setSubmissionNoteContent(e.target.value)
                                }}
                            />
                        </div>
                    </form>
                </td>
                <td>
                    <div className="table-buttons">
                        <input form="SupportNoteEdit" type="submit" />
                        <button type="submit"
                                onClick={() => {
                                    setIsNoteEdited(false)
                                }}
                        >
                            Anuluj edycję
                        </button>
                    </div>
                </td>
            </tr>
        ) : (
            <tr>
                <td className="scrollable wrap">
                    <ContentEditable
                        html={editedNoteContent}
                        onChange={() => {}}
                        disabled
                    />
                </td>
                <td>
                    <div className="table-buttons">
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
                    </div>
                </td>
            </tr>
        )
    )
}

export default SupportNote
