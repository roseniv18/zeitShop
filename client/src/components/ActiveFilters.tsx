import { Box, Stack, Chip, Button, capitalize } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { setFilters } from "../redux/productSlice"
import { initialFilters } from "../redux/initialStates/initialFilters"
import { Categories } from "../types/Categories"

const ActiveFilters = () => {
    const { filters } = useAppSelector((store) => store.products)
    const dispatch = useAppDispatch()

    const handleFilterDelete = (filterToDelete: string, category: Categories) => {
        const newFilters = {
            ...filters,
            [category]: filters[category].filter((el) => el !== filterToDelete),
        }
        dispatch(setFilters({ ...newFilters }))
    }

    const handlePriceReset = () => {
        const newFilters = {
            ...filters,
            price: [initialFilters.price[0], initialFilters.price[1]],
        }
        dispatch(setFilters({ ...newFilters }))
    }

    return (
        <Box>
            <Stack direction="row" sx={{ gap: "10px", flexWrap: "wrap" }}>
                {Object.keys(filters).map((filter, index) => {
                    const formattedFilter: string = filter
                        .replace("_", " ")
                        .toLocaleUpperCase()
                    if (
                        filter === "price" &&
                        (filters.price[0] !== initialFilters.price[0] ||
                            filters.price[1] !== initialFilters.price[1])
                    ) {
                        return (
                            <Chip
                                key={index}
                                label={`Price: €${filters.price[0]} - €${filters.price[1]}`}
                                variant="filled"
                                color="primary"
                                onDelete={handlePriceReset}
                            />
                        )
                    }
                    return filters[filter as keyof typeof filters].map((f, index) => {
                        if (
                            filter === "brand" ||
                            filter === "dial_color" ||
                            filter === "case_material" ||
                            filter === "band_material" ||
                            filter === "mechanism"
                        ) {
                            // @ts-ignore
                            const formattedFilterVal: string = f.replace("_", " ")
                            return (
                                <Chip
                                    key={index}
                                    label={`${formattedFilter}: ${capitalize(
                                        formattedFilterVal
                                    )}`}
                                    variant="filled"
                                    color="primary"
                                    onDelete={() =>
                                        handleFilterDelete(f as string, filter)
                                    }
                                />
                            )
                        }
                    })
                })}
            </Stack>
        </Box>
    )
}

export default ActiveFilters
