import { User } from "../../../types/UserTypes/User"
import { formatError } from "../../../helpers/formatError"
import axiosInstance from "../../../axios/axiosInstance"

export const loginUserThunk = async (
	userData: Partial<User>,
	thunkAPI: any
) => {
	try {
		const res = await axiosInstance.post(`/users/login`, userData)

		if (res.data) {
			localStorage.setItem("user", JSON.stringify(res.data))
		}

		return res.data
	} catch (error) {
		const message: string = formatError(error)
		return thunkAPI.rejectWithValue(message)
	}
}
