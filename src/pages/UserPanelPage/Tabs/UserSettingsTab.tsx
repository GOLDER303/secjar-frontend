import jwt_decode from "jwt-decode"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PasswordChangeForm from "../../../components/PasswordChangeForm"
import { getUserInfo } from "../../../services/UserManagementService"
import UserInfoDTO from "../../../ts/interfaces/UserInfoDTO"

const UserSettingsTab: React.FC = () => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = React.useState<UserInfoDTO | null>(null)
    const [statusMessage, setStatusMessage] = React.useState<string | null>(null)
    const [isPasswordChangeFormVisible, setIsPasswordChangeFormVisible] = React.useState(false)

    useEffect(() => {
        refreshDiskInfo()
    }, [])

    const refreshDiskInfo = async () => {
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

    return (
        <div>
            <h2>Ustawienia użytkownika</h2>
            {userInfo && (
                <ul>
                    <li>Typ używanego mfa: {userInfo.mfaType}</li>
                    <li>Czas do ostatecznego usunięcia pliku: {userInfo.fileDeletionDelay / 3600_000 / 24} dni</li>
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
