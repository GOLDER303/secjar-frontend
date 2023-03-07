import React from "react"
import { createSupportSubmission } from "../services/SupportService"

const SupportPage: React.FC = () => {
    const nameInputRef = React.useRef<HTMLInputElement>(null)
    const surnameInputRef = React.useRef<HTMLInputElement>(null)
    const emailInputRef = React.useRef<HTMLInputElement>(null)
    const descriptionInputRef = React.useRef<HTMLTextAreaElement>(null)

    const [submissionMessage, setSubmissionMessage] = React.useState<string>("")

    const handleSubmit = async () => {
        if (!nameInputRef.current || !surnameInputRef.current || !emailInputRef.current || !descriptionInputRef.current) {
            return
        }

        const createSupportSubmissionResponse = await createSupportSubmission(nameInputRef.current.value, surnameInputRef.current.value, emailInputRef.current.value, descriptionInputRef.current.value)

        if (createSupportSubmissionResponse.error) {
            setSubmissionMessage("Coś poszło nie tak")
        } else {
            setSubmissionMessage("Zgłoszenie wysłane")
        }
    }

    return (
        <>
            <h1>Support Page</h1>
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    handleSubmit()
                }}
            >
                <label htmlFor="name">Imię: </label>
                <input ref={nameInputRef} type="text" name="name" id="name" /> <br />
                <label htmlFor="surname">Nazwisko: </label>
                <input ref={surnameInputRef} type="text" name="surname" id="surname" /> <br />
                <label htmlFor="email">E-mail: </label>
                <input ref={emailInputRef} type="email" name="email" id="email" /> <br />
                <label htmlFor="description">Opis zgłoszenia: </label> <br />
                <textarea ref={descriptionInputRef} name="description" id="description" cols={30} rows={10}></textarea> <br />
                <button type="submit">Wyślij zgłoszenie</button>
            </form>
            <div>{submissionMessage}</div>
        </>
    )
}

export default SupportPage
