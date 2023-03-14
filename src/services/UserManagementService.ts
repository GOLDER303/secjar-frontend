import GeneralApiResponseDTO from "../ts/interfaces/GeneralApiResponseDTO"
import axios, {AxiosError} from "axios"
import ApiErrorResponseDTO from "../ts/interfaces/ApiErrorResponseDTO"
import UserInfoDTO from "../ts/interfaces/UserInfoDTO"
import UserPatchRequestDTO from "../ts/interfaces/UserPatchRequestDTO"

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

export const editUserInfo = async (uuid: string, UserPatchInfo: UserPatchRequestDTO): Promise<GeneralApiResponseDTO<null>> => {
    try {
        await axios.patch("http://localhost:8080/users/".concat(uuid), {
                ...UserPatchInfo
            },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        })
        return {}
    } catch (err) {
        const error = err as AxiosError

        const data = error.response?.data as ApiErrorResponseDTO

        return { error: data.status }
    }
}