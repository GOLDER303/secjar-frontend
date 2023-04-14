import React from "react"
import "../../css/GenericPopup.css"

interface SupportSubmissionAddNotePopupProps {
    handleNoteAdd: (submissionNoteContent: string) => void
    closePopup: () => void
}

const SupportSubmissionAddNotePopup: React.FC<SupportSubmissionAddNotePopupProps> = ({ handleNoteAdd, closePopup }) => {
    const submissionNoteContent = React.useRef<HTMLTextAreaElement>(null)

    const handleSubmit = () => {
        if (submissionNoteContent.current) {
            handleNoteAdd(submissionNoteContent.current.value)
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
                <label htmlFor="content">Notatka:</label><br />
                <textarea ref={submissionNoteContent} name="content" id="content" cols={30} rows={10} /><br />
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

export default SupportSubmissionAddNotePopup
