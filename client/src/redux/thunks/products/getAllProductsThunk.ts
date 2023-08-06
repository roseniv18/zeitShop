import { formatError } from "../../../helpers/formatError"
import { Filters } from "../../../types/Filters"
import axiosInstance from "../../../axios/axiosInstance"
import { initialFilters } from "../../initialStates/initialFilters"

export const getAllProductsThunk = async (
    filters: Partial<Filters> | void,
    thunkAPI: any
) => {
    let queries: any = {}

    if (filters && Object.keys(filters)) {
        if (filters.brand && filters.brand.length > 0) {
            queries.brand = filters.brand.join(",")
        }

        if (filters.band_material && filters.band_material.length > 0) {
            queries.band_material = filters.band_material.join(",")
        }

        if (filters.case_material && filters.case_material.length > 0) {
            queries.case_material = filters.case_material.join(",")
        }

        if (filters.dial_color && filters.dial_color.length > 0) {
            queries.dial_color = filters.dial_color.join(",")
        }

        if (filters.mechanism && filters.mechanism.length > 0) {
            queries.mechanism = filters.mechanism.join(",")
        }

        if (
            filters.price &&
            filters.price[0] !== initialFilters.price[0] &&
            filters.price[1] !== initialFilters.price[1]
        ) {
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
