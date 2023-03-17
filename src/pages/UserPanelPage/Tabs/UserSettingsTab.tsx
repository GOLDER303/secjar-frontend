import jwt_decode from "jwt-decode"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DoubleClickEditText from "../../../components/DoubleClickEditText"
import PasswordChangeForm from "../../../components/PasswordChangeForm"
import { editUserInfo, getUserInfo } from "../../../services/UserManagementService"
import UserInfoDTO from "../../../ts/interfaces/UserInfoDTO"

const UserSettingsTab: React.FC = () => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = React.useState<UserInfoDTO | null>(null)
    const [isPasswordChangeFormVisible, setIsPasswordChangeFormVisible] = React.useState(false)
    const [statusMessage, setStatusMessage] = React.useState<string | null>(null)

    const [fileDeletionDelay, setFileDeletionDelay] = React.useState<string>("")

    const refreshUserInfo = async () => {
        const token = localStorage.getItem("jwt")
        if (!token) {
            navigate("/login")
            return
        }
        const jwt = jwt_decode(token) as { userUuid: string }

        const response = await getUserInfo(jwt.userUuid)

        if (response.data) {
            setUserInfo(response.data)
        } else {
            if (response.error == 401) {
                navigate("/login")
            }
        }
    }

    useEffect(() => {
        refreshUserInfo()
    }, [])

    useEffect(() => {
        if (userInfo) {
            setFileDeletionDelay((userInfo.fileDeletionDelay / 3600_000 / 24).toString())
        }
    }, [userInfo])

    const handleFileDeletionDelayChange = async (newFileDeletionDelay: string) => {
        if (!userInfo) {
            return
        }
        const response = await editUserInfo(userInfo.uuid, parseInt(newFileDeletionDelay) * 3600_000 * 24)
        if (response.error) {
            setStatusMessage("Coś poszło nie tak, spróbuj ponownie później")
        }

        refreshUserInfo()
    }

    return (
        <div>
            <h2>Ustawienia użytkownika</h2>
            {userInfo && fileDeletionDelay && (
                <ul>
                    <li>Typ używanego mfa: {userInfo.mfaType}</li>
                    <li>
                        <DoubleClickEditText
                            value={fileDeletionDelay}
                            onBlurCallback={handleFileDeletionDelayChange}
                        />{" "}
                        dni
                    </li>
                    <li>
                        <button onClick={() => setIsPasswordChangeFormVisible(true)}>Zmień hasło</button>
                    </li>
                </ul>
            )}
            {isPasswordChangeFormVisible && <PasswordChangeForm />}
            <div className="error">{statusMessage}</div>
        </div>
    )
}

export default UserSettingsTab
