import { AxiosError } from "axios"

export const formatError = (error: any): string => {
    let message: string = ""
    if (typeof error === "string") {
        message = error
    } else if (error instanceof AxiosError) {
        if (error.response && error.response.data && error.response.data.message) {
            message = error.response.data.message
            return message
        }
    } else if (error instanceof Error) {
        message = error.message
    }
    return message
}
