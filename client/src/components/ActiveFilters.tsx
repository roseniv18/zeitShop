import { Box, Stack, Chip } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { setFilters } from "../redux/productSlice"
import { initialFilters } from "../redux/initialStates/initialFilters"

const ActiveFilters = () => {
    const { filters } = useAppSelector((store) => store.products)
    const dispatch = useAppDispatch()

    const handleFilterDelete = (
        filterToDelete: string,
        category: "brand" | "dial_color" | "case_material" | "band_material" | "mechanism"
    ) => {
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
        <Box
            sx={{
                position: "absolute",
                top: "30px",
                left: "95px",
                minHeight: "30px",
                height: "30px",
            }}
        >
            <Stack direction="row" sx={{ gap: "10px", height: "100%" }}>
                {Object.keys(filters).map((filter) => {
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
                                label={`Price: €${filters.price[0]} - €${filters.price[1]}`}
                                variant="filled"
                                color="primary"
                                onDelete={handlePriceReset}
                            />
                        )
                    }
                    return filters[filter as keyof typeof filters].map((f) => {
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
                                    label={`${formattedFilter}: ${formattedFilterVal}`}
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
