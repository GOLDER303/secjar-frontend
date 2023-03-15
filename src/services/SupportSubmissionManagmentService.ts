import GeneralApiResponseDTO from "../ts/interfaces/GeneralApiResponseDTO"
import axios, {AxiosError} from "axios"
import ApiErrorResponseDTO from "../ts/interfaces/ApiErrorResponseDTO"
import SupportSubmisionDTO from "../ts/interfaces/SupportSubmissionDTO"
import SupportSubmissionNoteDTO from "../ts/interfaces/SupportSubmissionNoteDTO"

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


export const closeSubmission = async (uuid: string): Promise<GeneralApiResponseDTO<null>> => {
    try {
        const response = await axios.patch("http://localhost:8080/support/submissions/".concat(uuid), {
            submissionStatus: "COMPLETED"
        }, {
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

export const getSubmissionNotes = async (uuid: string): Promise<GeneralApiResponseDTO<[SupportSubmissionNoteDTO]>> => {
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

export const editSubmissionNote = async (uuid: string, content: string): Promise<GeneralApiResponseDTO<null>> => {
    try {
        await axios.patch("http://localhost:8080/support/submissions/notes/".concat(uuid), {
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

export const deleteSubmissionNote = async (uuid: string): Promise<GeneralApiResponseDTO<null>> => {
    try {
        await axios.delete("http://localhost:8080/support/submissions/notes/".concat(uuid), {
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
