import { formatError } from "../../../helpers/formatError"
import { Review } from "../../../types/Review"
import axiosInstance from "../../../axios/axiosInstance"

export const addReviewThunk = async (
    { _id, review }: { _id: string; review: Partial<Review> },
    thunkAPI: any
) => {
    try {
        const res = await axiosInstance.post(`/users/addReview`, review, {
            params: { _id },
        })
        return res.data
    } catch (error) {
        let message: string = formatError(error)
        return thunkAPI.rejectWithValue(message)
    }
}
