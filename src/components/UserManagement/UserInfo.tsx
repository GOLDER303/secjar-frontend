import React from "react"
import UserInfoDTO from "../../ts/interfaces/UserInfoDTO"

interface UserProps {
    userInfoDTO: UserInfoDTO
    openUserEditPopup: () => void
    setWhichUserToEdit: (param: string) => void
}

const sizeUnits = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"]

const UserInfo: React.FC<UserProps> = ({ userInfoDTO, openUserEditPopup, setWhichUserToEdit }) => {
    let sizeValue = [0, 0]
    let sizeUnit = ["", ""]
    let sizeValues = [userInfoDTO.currentDiscSpace, userInfoDTO.allowedDiscSpace]

    const getBaseLog = (val: number, base: number) => {
        return Math.log(val) / Math.log(base)
    }
    sizeValues.map((size, index) => {
        if (size != 0) {
            const sizeScale = Math.min(Math.floor(getBaseLog(size, 1024)), 6)
            sizeValue[index] = Math.floor((100 * size) / Math.pow(1024, sizeScale)) / 100
            sizeUnit[index] = sizeUnits[sizeScale]
        }
    })

    return (
        <tr>
            <td>{userInfoDTO.username}</td>
            <td>{/* userInfoDTO.surname */}</td>
            {/* TODO: name and surname instead of username */}
            <td>{userInfoDTO.email}</td>
            <td>
                <progress
                    id="file"
                    value={userInfoDTO.currentDiscSpace}
                    max={userInfoDTO.allowedDiscSpace}
                />
                {sizeValue[0]} {sizeUnit[0]} / {sizeValue[1]} {sizeUnit[1]}
            </td>
            <td>
                <button
                    onClick={() => {
                        openUserEditPopup()
                        // setWhichUserToEdit(userInfoDTO.uuid)
                        // TODO: edit user by uuid
                    }}
                >
                    Edytuj
                </button>
            </td>
        </tr>
    )
}

export default UserInfo
