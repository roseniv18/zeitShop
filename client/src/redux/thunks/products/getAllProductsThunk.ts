import { formatError } from "../../../helpers/formatError"
import { Filters } from "../../../types/Filters"
import axiosInstance from "../../../axios/axiosInstance"

export const getAllProductsThunk = async (
    filters: Partial<Filters> | void,
    thunkAPI: any
) => {
    let queries: any = {}

    if (filters && Object.keys(filters)) {
        if (filters.brand) {
            queries.brand = filters.brand.join(",")
        }

        if (filters.band_material) {
            queries.band_material = filters.band_material.join(",")
        }

        if (filters.case_material) {
            queries.case_material = filters.case_material.join(",")
        }

        if (filters.dial_color) {
            queries.dial_color = filters.dial_color.join(",")
        }

        if (filters.mechanism) {
            queries.mechanism = filters.mechanism.join(",")
        }

        if (filters.price) {
            queries.price = filters.price.join(",")
        }
    }

    try {
        const products = await axiosInstance.get(`/products`, {
            params: queries,
        })
        return products.data
    } catch (error) {
        let message: string = formatError(error)
        return thunkAPI.rejectWithValue(message)
    }
}
