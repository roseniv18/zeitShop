import { Filters } from "../types/Filters"
import { initialFilters } from "../redux/initialStates/initialFilters"

export const isFiltersEmpty = (filters: Partial<Filters>): boolean => {
    if (filters && Object.keys(filters)) {
        if (filters.brand && filters.brand.length > 0) {
            return false
        }

        if (filters.band_material && filters.band_material.length > 0) {
            return false
        }

        if (filters.case_material && filters.case_material.length > 0) {
            return false
        }

        if (filters.dial_color && filters.dial_color.length > 0) {
            return false
        }

        if (filters.mechanism && filters.mechanism.length > 0) {
            return false
        }

        if (
            filters.price &&
            filters.price[0] !== initialFilters.price[0] &&
            filters.price[1] !== initialFilters.price[1]
        ) {
            return false
        }
    }

    return true
}
