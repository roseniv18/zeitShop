import { formatError } from "../../../helpers/formatError"
import axiosInstance from "../../../axios/axiosInstance"

export const addToWishlistThunk = async (
	{
		_id,
		productName,
		image,
		productId,
	}: { _id: string; productName: string; image: string; productId: string },
	thunkAPI: any
) => {
	try {
		const res = await axiosInstance.post(
			`/users/addToWishlist`,
			{ productName, image, productId },
			{
				params: { _id },
			}
		)
		return res.data
	} catch (error) {
		const message: string = formatError(error)
		return thunkAPI.rejectWithValue(message)
	}
}
