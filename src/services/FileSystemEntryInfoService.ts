import axios, { AxiosError } from "axios"
import ApiErrorResponseDTO from "../ts/interfaces/ApiErrorResponseDTO"
import FileSystemEntryInfoDTO from "../ts/interfaces/FileSystemEntryInfoDTO"
import GeneralApiResponseDTO from "../ts/interfaces/GeneralApiResponseDTO"

export const getFileSystemEntriesInfo = async (): Promise<GeneralApiResponseDTO<[FileSystemEntryInfoDTO]>> => {
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
