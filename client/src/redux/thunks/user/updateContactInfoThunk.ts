import { User } from "../../../types/User"
import { formatError } from "../../../helpers/formatError"
import axiosInstance from "../../../axios/axiosInstance"

export const updateContactInfoThunk = async (
    { _id, userInfo }: { _id: string; userInfo: Partial<User> },
    thunkAPI: any
) => {
    try {
        const res = await axiosInstance.patch(`/users/updateContactInfo`, userInfo, {
            params: { _id },
        })

        return res.data
    } catch (error) {
        let message: string = formatError(error)
        return thunkAPI.rejectWithValue(message)
    }
}
