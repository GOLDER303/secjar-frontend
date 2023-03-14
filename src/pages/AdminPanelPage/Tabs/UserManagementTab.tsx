import React, {useEffect} from "react"
import {editUserInfo, getAllUserInfo} from "../../../services/UserManagementService"
import UserInfoList from "../../../components/UserInfoList"
import UserInfoDTO from "../../../ts/interfaces/UserInfoDTO"
import UserEditPopup from "../../../components/UserEditPopup"
import UserPatchRequestDTO from "../../../ts/interfaces/UserPatchRequestDTO"

const UserManagementTab: React.FC = () => {
    const [userInfo, setUserInfo] = React.useState<UserInfoDTO[]>([])
    const [isUserEditPopupVisible, setIsUserEditPopupVisible] = React.useState(false)
    const [whichUserToEdit, setWhichUserToEdit] = React.useState<string | null>(null)

    useEffect(() => {
        refreshUserInfo()
    })

    const closeUserEditPopup = () => {
        setIsUserEditPopupVisible(false)
    }

    const openUserEditPopup = () => {
        setIsUserEditPopupVisible(true)
    }

    const refreshUserInfo = async () => {
        const response = await getAllUserInfo()
        if (response.data){
            setUserInfo(response.data)
        }else{
            //TODO: handle error
        }
    }

    const handleUserEdit = async (userPatchRequestDTO : UserPatchRequestDTO) => {
        if (whichUserToEdit) {
            await editUserInfo(whichUserToEdit, userPatchRequestDTO)
            // TODO: handle errors
            refreshUserInfo()
        }
    }

    return (
        <div>
            <UserInfoList
                userInfoDTO={userInfo}
                openUserEditPopup={openUserEditPopup}
                setWhichUserToEdit={setWhichUserToEdit}
            />
            <button>Zaproś użytkownika</button>
            {isUserEditPopupVisible && (
                <UserEditPopup
                    handleUserEdit={handleUserEdit}
                    closePopup={closeUserEditPopup}
                />
            )}
        </div>
    )
}

export default UserManagementTab