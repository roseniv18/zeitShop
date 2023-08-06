import { formatError } from "../../../helpers/formatError"
import axiosInstance from "../../../axios/axiosInstance"

export const getSearchProductsThunk = async (searchQuery: string, thunkAPI: any) => {
    try {
        const products = await axiosInstance.get(`/products/getSearchProducts`, {
            params: {
                search: searchQuery,
            },
        })
        return products.data
    } catch (error) {
        let message: string = formatError(error)
        return thunkAPI.rejectWithValue(message)
    }
}
