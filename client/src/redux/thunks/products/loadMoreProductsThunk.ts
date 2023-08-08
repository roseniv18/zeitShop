import { formatError } from "../../../helpers/formatError"
import { Filters } from "../../../types/Filters"
import axiosInstance from "../../../axios/axiosInstance"
import { Sort } from "../../../types/Sort"

export const loadMoreProductsThunk = async (
    { filters, sort, page }: { filters?: Partial<Filters>; sort?: Sort; page?: number },
    thunkAPI: any
) => {
    let queries: any = {
        page: page || 1,
    }

    if (sort) {
        // example vals: ["price", "desc"]
        const vals: string[] = sort.split("-")
        queries.sortBy = vals[0]
        if (vals[1] === "asc") {
            queries.sortOrder = 1
        }
        if (vals[1] === "desc") {
            queries.sortOrder = -1
        }
    }

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
