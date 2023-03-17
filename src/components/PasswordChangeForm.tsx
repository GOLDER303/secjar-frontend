import React, { useRef } from "react"
import { changeUserPassword } from "../services/PasswordChangeService"

const PasswordChangeForm: React.FC = () => {
    const currentPassword = useRef<HTMLInputElement>(null)
    const newPassword = useRef<HTMLInputElement>(null)
    const repeatPassword = useRef<HTMLInputElement>(null)
    const [responseMessage, setResponseMessage] = React.useState<string>("")

    const handleSubmit = async () => {
        if (currentPassword.current && newPassword.current && repeatPassword.current) {
            if (newPassword.current.value != repeatPassword.current.value) {
                setResponseMessage("Błąd w powtórzonym haśle")
                return
            }

            if (currentPassword.current.value == newPassword.current.value) {
                setResponseMessage("Nowe hasło powinno być różne od obecnego hasła.")
                return
            }

            const response = await changeUserPassword(currentPassword.current.value, newPassword.current.value)

            if (response.data) {
                if (response.data == "Password changed") {
                    setResponseMessage("Zmieniono hasło")
                } else if (response.data.startsWith("Bad password.")) {
                    setResponseMessage("Hasło musi mieć od 8. do 30. znaków, co najmniej jedną wielką literę, co najmniej jedną małą literę, cyfrę oraz znak specjalny")
                } else {
                    setResponseMessage(response.data)
                }
            } else {
                setResponseMessage("Podano błędne hasło")
            }
        }
    }

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
                handleSubmit()
            }}
        >
            Obecne hasło:{" "}
            <input
                ref={currentPassword}
                type="password"
            />
            <br />
            Nowe hasło:{" "}
            <input
                ref={newPassword}
                type="password"
            />
            <br />
            Powtórz nowe hasło:{" "}
            <input
                ref={repeatPassword}
                type="password"
            />
            <br />
            <input type="submit" />
            <br />
            {responseMessage != "" && <div className="error">{responseMessage}</div>}
        </form>
    )
}

export default PasswordChangeForm
