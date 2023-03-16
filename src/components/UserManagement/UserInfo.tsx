import React from "react"
import UserInfoDTO from "../../ts/interfaces/UserInfoDTO"
import {formatFileSize} from "../../utils/FormatFileSizeUtil";

interface UserProps {
    userInfoDTO: UserInfoDTO
    openUserEditPopup: () => void
    setWhichUserToEdit: (param: string) => void
}

const UserInfo: React.FC<UserProps> = ({ userInfoDTO, openUserEditPopup, setWhichUserToEdit }) => {
    const { sizeValue: currentDiscSpaceValue, sizeUnit: currentDiscSpaceUnit } = formatFileSize(userInfoDTO.currentDiscSpace)
    const { sizeValue: allowedDiscSpaceValue, sizeUnit: allowedDiscSpaceUnit } = formatFileSize(userInfoDTO.allowedDiscSpace)

    return (
        <tr>
            <td>{userInfoDTO.username}</td>
            <td>{userInfoDTO.name}</td>
            <td>{userInfoDTO.surname}</td>
            <td>{userInfoDTO.email}</td>
            <td>
                <progress
                    id="file"
                    value={userInfoDTO.currentDiscSpace}
                    max={userInfoDTO.allowedDiscSpace}
                />
                {currentDiscSpaceValue} {currentDiscSpaceUnit} / {allowedDiscSpaceValue} {allowedDiscSpaceUnit}
            </td>
            <td>
                <button
                    onClick={() => {
                        openUserEditPopup()
                        setWhichUserToEdit(userInfoDTO.uuid)
                    }}
                >
                    Edytuj
                </button>
            </td>
        </tr>
    )
}

export default UserInfo
