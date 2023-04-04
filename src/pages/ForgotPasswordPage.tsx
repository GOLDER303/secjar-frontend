import React from "react"
import {sendPasswordResetLink} from "../services/PasswordChangeService"
import {useNavigate} from "react-router-dom";

const ForgotPasswordPage: React.FC = () => {
    const [stage, setStage] = React.useState(0)    //current stage of resetting password process
    const [responseMessage, setResponseMessage] = React.useState<string>("")
    const emailInputRef = React.useRef<HTMLInputElement>(null)
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if (emailInputRef.current) {
            const result = await sendPasswordResetLink(emailInputRef.current.value)
            if (result.data){
                setStage(1);
            }else{
                setResponseMessage("Wystąpił nieoczekiwany błąd")
            }
        }
    }

    return (
        <>
            <h1>Podaj email na który wyślemy link resetujący hasło</h1>
            {stage == 0 ? (
                <form
                    onSubmit={(event) => {
                        event.preventDefault()
                        handleSubmit()
                    }}
                >
                    <label>Adres e-mail: <input ref={emailInputRef} type="email" required /></label>
                    <input type="submit" />
                    {responseMessage && <p>{responseMessage}</p>}
                </form>

            ) : stage == 1 ? (
                <p>Wysłaliśmy link resetu hasła na podany e-mail. Sprawdź swoją skrzynkę odbiorczą.</p>
            ) : (
                <p>Wystąpił nieoczekiwany błąd.</p>
            )}
            <button onClick={() => navigate("/login")}>
                Powróć do strony logowania
            </button>
        </>
    )
}

export default ForgotPasswordPage
