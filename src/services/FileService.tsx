import GeneralApiResponseDTO from "../ts/interfaces/GeneralApiResponseDTO"
import axios, { AxiosError } from "axios"
import ApiErrorResponseDTO from "../ts/interfaces/ApiErrorResponseDTO"
import ApiFileResponseDTO from "../ts/interfaces/ApiFileResponseDTO"

export const getMyFiles = async (): Promise<GeneralApiResponseDTO<[ApiFileResponseDTO]>> => {
    try {
        const response = await axios.get("http://localhost:8080/fileSystemEntries/info", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        })
        return { data: response.data.fileSystemEntryInfoList }
    } catch (err) {
        const error = err as AxiosError

        const data = error.response?.data as ApiErrorResponseDTO

        return { error: data.status }
    }
}
