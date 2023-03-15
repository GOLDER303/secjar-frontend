import GeneralApiResponseDTO from "../ts/interfaces/GeneralApiResponseDTO"
import axios, {AxiosError} from "axios"
import ApiErrorResponseDTO from "../ts/interfaces/ApiErrorResponseDTO"
import SupportSubmisionDTO from "../ts/interfaces/SupportSubmissionDTO"

export const getPendingSubmissions = async (): Promise<GeneralApiResponseDTO<[SupportSubmisionDTO]>> => {
    try {
        const response = await axios.get("http://localhost:8080/support/submissions/pending", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        })

        return { data: response.data.pendingSubmissions }
    } catch (err) {
        const error = err as AxiosError

        const data = error.response?.data as ApiErrorResponseDTO

        return { error: data.status }
    }
}

export const getSubmissionNotes = async (uuid: string): Promise<GeneralApiResponseDTO<[SupportSubmisionDTO]>> => {
    try {
        const response = await axios.get("http://localhost:8080/support/submissions/".concat(uuid).concat("/notes"), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        })

        return { data: response.data.supportSubmissionNotes }
    } catch (err) {
        const error = err as AxiosError

        const data = error.response?.data as ApiErrorResponseDTO

        return { error: data.status }
    }
}

export const addNoteToSubmission = async (uuid: string, content: string): Promise<GeneralApiResponseDTO<null>> => {
    try {
        await axios.post("http://localhost:8080/support/submissions/".concat(uuid).concat("/notes"), {
            content
        }, {
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
