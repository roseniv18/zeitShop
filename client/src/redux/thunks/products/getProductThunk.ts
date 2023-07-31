import { formatError } from "../../../helpers/formatError"
import axiosInstance from "../../../axios/axiosInstance"

export const getProductThunk = async (nameId: string, thunkAPI: any) => {
    try {
        const products = await axiosInstance.get(`/products/getProduct/${nameId}`)
        return products.data
    } catch (error) {
        let message: string = formatError(error)
        return thunkAPI.rejectWithValue(message)
    }
}
