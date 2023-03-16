import GeneralApiResponseDTO from "../ts/interfaces/GeneralApiResponseDTO"
import axios, {AxiosError} from "axios"
import ApiErrorResponseDTO from "../ts/interfaces/ApiErrorResponseDTO"
import DiskInfoDTO from "../ts/interfaces/DiskInfoDTO"

export const getDiskInfo = async (): Promise<GeneralApiResponseDTO<DiskInfoDTO>> => {
    try {
        const response = await axios.get("http://localhost:8080/diskInfo", {
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

export const editDiskInfo = async (diskInfoDTO: DiskInfoDTO): Promise<GeneralApiResponseDTO<null>> => {
    try {
        await axios.patch("http://localhost:8080/diskInfo", {
            ...diskInfoDTO
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