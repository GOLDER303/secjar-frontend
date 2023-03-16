import React from "react"
import UserInfo from "./UserInfo"
import UserInfoDTO from "../../ts/interfaces/UserInfoDTO"

interface UserInfoListProps {
    userInfoDTO: UserInfoDTO[]
    openUserEditPopup: () => void
    setWhichUserToEdit: (param: string) => void
}

const UserInfoList: React.FC<UserInfoListProps> = ({ userInfoDTO, openUserEditPopup, setWhichUserToEdit }) => {
    return (
        <table>
            <tr>
                <th>Nazwa użytkownika</th>
                <th>Imię</th>
                <th>Nazwisko</th>
                <th>Dane kontaktowe</th>
                <th>Ilość zajętego miejsca</th>
            </tr>
            {userInfoDTO.map((userInfoDTO) => {
                return (
                    <UserInfo
                        userInfoDTO={userInfoDTO}
                        openUserEditPopup={openUserEditPopup}
                        setWhichUserToEdit={setWhichUserToEdit}
                    />
                )
            })}
        </table>
    )
}

export default UserInfoList
