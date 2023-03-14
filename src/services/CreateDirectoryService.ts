import GeneralApiResponseDTO from "../ts/interfaces/GeneralApiResponseDTO"
import axios, {AxiosError} from "axios"
import ApiErrorResponseDTO from "../ts/interfaces/ApiErrorResponseDTO"

export const createDirectory = async (directoryName: string): Promise<GeneralApiResponseDTO<{message: string}>> => {
    try {
        const response = await axios.post("http://localhost:8080/fileSystemEntries", {
            'directoryName': directoryName
        }, {
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