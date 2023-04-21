import React from "react"
import { createSupportSubmission } from "../services/SupportService"
import "../css/GenericForm.css"
import ContentEditable from "react-contenteditable"

const SupportPage: React.FC = () => {
    const nameInputRef = React.useRef<HTMLInputElement>(null)
    const surnameInputRef = React.useRef<HTMLInputElement>(null)
    const emailInputRef = React.useRef<HTMLInputElement>(null)
    const [descriptionInputContent, setDescriptionInputContent] = React.useState<string>("")

    const [submissionMessage, setSubmissionMessage] = React.useState<string>("")

    const handleSubmit = async () => {
        if (!nameInputRef.current || !surnameInputRef.current || !emailInputRef.current || descriptionInputContent == "") {
            return
        }

        const createSupportSubmissionResponse = await createSupportSubmission(nameInputRef.current.value, surnameInputRef.current.value, emailInputRef.current.value, descriptionInputContent)

        if (createSupportSubmissionResponse.error) {
            setSubmissionMessage("Coś poszło nie tak")
        } else {
            setSubmissionMessage("Zgłoszenie wysłane")
        }
    }

    return (
        <div className="container">
            <div className="box-outline">
                <div className="box-content wide-inputBox">
                    <h1 className="header">Pomoc techniczna</h1>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault()
                            handleSubmit()
                        }}
                    >
                        <div className="inputBox">
                            <input
                                placeholder=" "
                                ref={nameInputRef}
                                type="text"
                                name="name"
                                id="name"
                            />
                            <label htmlFor="name">Imię: </label>
                        </div>
                        <div className="inputBox">
                            <input
                                placeholder=" "
                                ref={surnameInputRef}
                                type="text"
                                name="surname"
                                id="surname"
                            />
                            <label htmlFor="surname">Nazwisko: </label>
                        </div>
                        <div className="inputBox">
                            <input
                                placeholder=" "
                                ref={emailInputRef}
                                type="email"
                                name="email"
                                id="email"
                            />
                            <label htmlFor="email">E-mail: </label>
                        </div>
                        <div className="inputBox">
                            <ContentEditable
                                html={descriptionInputContent}
                                onChange={(e) => {
                                    setDescriptionInputContent(e.target.value)
                                }}
                            />
                            <label htmlFor="description">Opis zgłoszenia: </label>
                        </div>
                        <div className="buttons">
                            <button type="submit">Wyślij zgłoszenie</button>
                        </div>
                    </form>
                    <div className="error-message">{submissionMessage}</div>
                </div>
            </div>
        </div>
    )
}

export default SupportPage
