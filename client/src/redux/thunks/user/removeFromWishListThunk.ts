import { formatError } from "../../../helpers/formatError"
import axiosInstance from "../../../axios/axiosInstance"

export const removeFromWishlistThunk = async (
    { _id, productId }: { _id: string; productId: string },
    thunkAPI: any
) => {
    try {
        const res = await axiosInstance.delete(`/users/removeFromWishlist`, {
            params: { _id, productId },
        })

        return res.data
    } catch (error) {
        let message: string = formatError(error)
        return thunkAPI.rejectWithValue(message)
    }
}
