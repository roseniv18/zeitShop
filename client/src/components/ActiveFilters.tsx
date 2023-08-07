import { Box, Stack, Chip } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { setFilters } from "../redux/productSlice"

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
                    return filters[filter as keyof typeof filters].map((f) => {
                        if (
                            filter === "brand" ||
                            filter === "dial_color" ||
                            filter === "case_material" ||
                            filter === "band_material" ||
                            filter === "mechanism"
                        )
                            return (
                                <Chip
                                    label={f}
                                    variant="filled"
                                    color="primary"
                                    onDelete={() =>
                                        handleFilterDelete(f as string, filter)
                                    }
                                />
                            )
                    })
                })}
            </Stack>
        </Box>
    )
}

export default ActiveFilters
