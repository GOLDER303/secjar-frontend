import React, { useEffect } from "react"
import { editUserInfo, getAllUserInfo, inviteUser } from "../../../services/UserManagementService"
import UserInfoList from "../../../components/UserManagement/UserInfoList"
import UserInfoDTO from "../../../ts/interfaces/UserInfoDTO"
import UserEditPopup from "../../../components/UserManagement/UserEditPopup"
import UserPatchRequestDTO from "../../../ts/interfaces/UserPatchRequestDTO"
import UserInvitationPopup from "../../../components/UserManagement/UserInvitationPopup"
import UserInviteRequestDTO from "../../../ts/interfaces/UserInviteRequestDTO"

const UserManagementTab: React.FC = () => {
    const [userInfo, setUserInfo] = React.useState<UserInfoDTO[]>([])
    const [isUserEditPopupVisible, setIsUserEditPopupVisible] = React.useState(false)
    const [isUserInvitationPopupVisible, setIsUserInvitationPopupVisible] = React.useState(false)
    const [whichUserToEdit, setWhichUserToEdit] = React.useState<string | null>(null)

    useEffect(() => {
        refreshUserInfo()
    }, [])

    const closeUserEditPopup = () => {
        setIsUserEditPopupVisible(false)
    }

    const openUserEditPopup = () => {
        setIsUserEditPopupVisible(true)
    }

    const closeUserInvitationPopup = () => {
        setIsUserInvitationPopupVisible(false)
    }

    const openUserInvitationPopup = () => {
        setIsUserInvitationPopupVisible(true)
    }

    const getUserEditPopupData = () => {
        if (whichUserToEdit) {
            const user = userInfo.find((value) => {
                return value.uuid == whichUserToEdit
            })
            if (user){
                return {
                    fileDeletionDelay: user.fileDeletionDelay,
                    desiredSessionTime: 0,
                    // TODO: replace with desiredSessionTime taken from user
                    allowedDiskSpace: user.allowedDiscSpace,
                } as UserPatchRequestDTO
            }
        }
        return null
    }

    const refreshUserInfo = async () => {
        const response = await getAllUserInfo()
        if (response.data) {
            setUserInfo(response.data)
        } else {
            //TODO: handle error
        }
    }

    const handleUserEdit = async (userPatchRequestDTO: UserPatchRequestDTO) => {
        if (whichUserToEdit) {
            await editUserInfo(whichUserToEdit, userPatchRequestDTO)
            // TODO: handle errors
            refreshUserInfo()
        }
    }

    const handleUserInvitation = async (userInviteRequestDTO: UserInviteRequestDTO) => {
        await inviteUser(userInviteRequestDTO)
        // TODO: handle errors
    }

    return (
        <div>
            <h2>Użytkownicy</h2>
            <UserInfoList
                userInfoDTO={userInfo}
                openUserEditPopup={openUserEditPopup}
                setWhichUserToEdit={setWhichUserToEdit}
            />
            <button
                onClick={() => {
                    openUserInvitationPopup()
                }}
            >
                Zaproś użytkownika
            </button>
            {isUserEditPopupVisible && (
                <UserEditPopup
                    handleUserEdit={handleUserEdit}
                    closePopup={closeUserEditPopup}
                    getUserEditPopupData={getUserEditPopupData}
                />
            )}
            {isUserInvitationPopupVisible && (
                <UserInvitationPopup
                    handleUserInvitation={handleUserInvitation}
                    closePopup={closeUserInvitationPopup}
                />
            )}
        </div>
    )
}

export default UserManagementTab
