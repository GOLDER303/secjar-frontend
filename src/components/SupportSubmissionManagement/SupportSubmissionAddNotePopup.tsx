import React from "react"
import "../../css/GenericPopup.css"
import ContentEditable from "react-contenteditable";

interface SupportSubmissionAddNotePopupProps {
    handleNoteAdd: (submissionNoteContent: string) => void
    closePopup: () => void
}

const SupportSubmissionAddNotePopup: React.FC<SupportSubmissionAddNotePopupProps> = ({ handleNoteAdd, closePopup }) => {
    const [submissionNoteContent, setSubmissionNoteContent] = React.useState<string>("")

    const handleSubmit = () => {
        if (submissionNoteContent != "") {
            handleNoteAdd(submissionNoteContent)
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
                <div className="inputBox">
                    <ContentEditable
                        html={submissionNoteContent}
                        onChange={(e) => {
                            setSubmissionNoteContent(e.target.value)
                        }}
                    />
                    <label htmlFor="content">Notatka:</label>
                </div>
                <div className="buttons">
                    <input type="submit" />
                    <button
                        type="submit"
                        onClick={closePopup}
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SupportSubmissionAddNotePopup
