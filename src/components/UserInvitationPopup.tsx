import React from "react"
import "../css/FileUploadPopup.css"
import UserInviteRequestDTO from "../ts/interfaces/UserInviteRequestDTO"

interface UserInvitationPopupProps {
    handleUserInvitation: (userInviteRequestDTO: UserInviteRequestDTO) => void
    closePopup: () => void
}

const UserInvitationPopup: React.FC<UserInvitationPopupProps> = ({ handleUserInvitation, closePopup }) => {
    const [username, setUsername] = React.useState<string | null>(null)
    const [name, setName] = React.useState<string | null>(null)
    const [surname, setSurname] = React.useState<string | null>(null)
    const [email, setEmail] = React.useState<string | null>(null)

    const handleSubmit = () => {
        if (username && name && surname && email) {
            const userInviteRequestDTO = {
                username: username,
                name: name,
                surname: surname,
                email: email,
            } as UserInviteRequestDTO
            handleUserInvitation(userInviteRequestDTO)
            closePopup()
        }
    }

    return (
        <div className="file-upload-popup">
            <form
                onSubmit={(event) => {
                    event.preventDefault()
                    handleSubmit()
                }}
            >
                <label>
                    Nazwa użytkownika:
                    <input
                        required
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    /> dni
                </label><br />
                <label>
                    Imię:
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    /> dni
                </label><br />
                <label>
                    Nazwisko:
                    <input
                        required
                        type="text"
                        onChange={(e) => setSurname(e.target.value)}
                    /> MB
                </label><br />
                <label>
                    Adres email:
                    <input
                        required
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    /> MB
                </label><br />
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

export default UserInvitationPopup
