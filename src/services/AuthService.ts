import axios, { AxiosError } from "axios"

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post("http://localhost:8080/login", {
            username: username,
            password: password,
        })

        localStorage.setItem("jwt", response.data.accessToken)

        return response.status
    } catch (err) {
        const error = err as AxiosError
        const data = error.response?.data as { status: number; error: string; time_stamp: string }
        return data.status
    }
}
