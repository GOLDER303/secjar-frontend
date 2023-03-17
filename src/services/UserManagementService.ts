import axios, { AxiosError } from "axios"
import ApiErrorResponseDTO from "../ts/interfaces/ApiErrorResponseDTO"
import GeneralApiResponseDTO from "../ts/interfaces/GeneralApiResponseDTO"
import UserInfoDTO from "../ts/interfaces/UserInfoDTO"
import UserInviteRequestDTO from "../ts/interfaces/UserInviteRequestDTO"

export const getAllUserInfo = async (): Promise<GeneralApiResponseDTO<[UserInfoDTO]>> => {
    try {
        const response = await axios.get("http://localhost:8080/users/info", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        })

        return { data: response.data }
    } catch (err) {
        const error = err as AxiosError

        const data = error.response?.data as ApiErrorResponseDTO

        return { error: data.status }
    }
}

export const getUserInfo = async (userUuid: string): Promise<GeneralApiResponseDTO<UserInfoDTO>> => {
    try {
        const response = await axios.get(`http://localhost:8080/users/${userUuid}/info`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        })

        return { data: response.data }
    } catch (err) {
        const error = err as AxiosError

        const data = error.response?.data as ApiErrorResponseDTO

        return { error: data.status }
    }
}

export const editUserInfo = async (uuid: string, fileDeletionDelay?: number, desiredSessionTime?: number, allowedDiskSpace?: number): Promise<GeneralApiResponseDTO<null>> => {
    try {
        await axios.patch(
            "http://localhost:8080/users/".concat(uuid),
            {
                fileDeletionDelay,
                desiredSessionTime,
                allowedDiskSpace,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            }
        )
        return {}
    } catch (err) {
        const error = err as AxiosError

        const data = error.response?.data as ApiErrorResponseDTO

        return { error: data.status }
    }
}

export const inviteUser = async (userInvite: UserInviteRequestDTO): Promise<GeneralApiResponseDTO<null>> => {
    try {
        await axios.patch(
            "http://localhost:8080/invite",
            {
                ...userInvite,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            }
        )
        return {}
    } catch (err) {
        const error = err as AxiosError

        const data = error.response?.data as ApiErrorResponseDTO

        return { error: data.status }
    }
}
