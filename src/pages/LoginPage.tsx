import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { IsLoggedInContext, IsLoggedInContextType } from "../IsLoggedInContext"
import { login } from "../services/AuthService"

const LoginPage: React.FC = () => {
    const navigate = useNavigate()

    const usernameInputRef = React.useRef<HTMLInputElement>(null)
    const passwordInputRef = React.useRef<HTMLInputElement>(null)

    const [loginError, setLoginError] = React.useState<string>("")
    const { setIsUserLoggedIn } = React.useContext(IsLoggedInContext) as IsLoggedInContextType

    const handleSubmit = async () => {
        if (!usernameInputRef.current || !passwordInputRef.current) {
            return
        }
        setLoginError("")

        setIsUserLoggedIn(false)

        const responseStatus = await login(usernameInputRef.current.value, passwordInputRef.current.value)

        if (responseStatus == 200) {
            setIsUserLoggedIn(true)
            navigate("/home")
        } else if (responseStatus == 401) {
            setLoginError("Podałeś zły login lub hasło")
        } else {
            setLoginError("Coś poszło nie tak, spróbuj później")
        }
    }

    return (
        <div>
            <h1>Login Page</h1>
            <h2>Formularz logowania</h2>
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
                <div className="error-message">{loginError}</div>
            </form>
            <Link to={"/forgotPassword"}>Zapomniałem hasła</Link> <br />
            <Link to={"/support"}>Pomoc techniczna</Link>
        </div>
    )
}

export default LoginPage
