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

export const fileUpload = async (file: File | null, replace: boolean, parentDirectoryUuid: string | null): Promise<GeneralApiResponseDTO<string> | null> => {
    if (file == null) {
        return null
    }
    try {
        let body: { file: File; replace: boolean; parentDirectoryUuid?: string }
        body = {
            file: file,
            replace: replace,
        }
        if (parentDirectoryUuid) {
            body.parentDirectoryUuid = parentDirectoryUuid
        }
        const response = await axios.post(
            "http://localhost:8080/fileSystemEntries",
            {
                ...body,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        )

        return { data: response.data }
    } catch (err) {
        const error = err as AxiosError
        const data = error.response

        return { error: data?.status }
    }
}

export const deleteFile = async (fileUuid: string, instantDelete: boolean): Promise<GeneralApiResponseDTO<void>> => {
    try {
        const response = await axios.delete(`http://localhost:8080/fileSystemEntries/${fileUuid}`, {
            params: {
                instantDelete
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        })

        return {}
    } catch (err) {
        const error = err as AxiosError
        const data = error.response

        return { error: data?.status }
    }
}
