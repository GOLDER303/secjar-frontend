import React from "react"

interface LoginPasswordFormProps {
    handleLoginPasswordSubmit: (username: string, password: string) => void
}

const LoginPasswordForm: React.FC<LoginPasswordFormProps> = ({ handleLoginPasswordSubmit }) => {
    const usernameInputRef = React.useRef<HTMLInputElement>(null)
    const passwordInputRef = React.useRef<HTMLInputElement>(null)

    const handleSubmit = () => {
        if (!usernameInputRef.current || !passwordInputRef.current) {
            return
        }
        handleLoginPasswordSubmit(usernameInputRef.current.value, passwordInputRef.current.value)
    }

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
                handleSubmit()
            }}
        >
            <div>
                <label htmlFor="username">Nazwa użytkownika: </label>
                <input ref={usernameInputRef} type="text" name="username" id="username" /> <br />
                <label htmlFor="password">Hasło: </label>
                <input ref={passwordInputRef} type="password" name="password" id="password" />
            </div>
            <button type="submit">Zaloguj się</button>
        </form>
    )
}

export default LoginPasswordForm
