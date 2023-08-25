import { formatError } from "../../../helpers/formatError"
import axiosInstance from "../../../axios/axiosInstance"

export const getReviewsThunk = async (_id: string, thunkAPI: any) => {
    try {
        const productReviews = await axiosInstance.get(`/users/getReviews`, {
            params: { _id },
        })
        return productReviews.data
    } catch (error) {
        let message: string = formatError(error)
        return thunkAPI.rejectWithValue(message)
    }
}
