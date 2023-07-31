import CategorySidebar from "../components/CategorySidebar"
import { Grid, Container, Typography, Stack, Chip, Box } from "@mui/material"
import Item from "../components/Item"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { useEffect } from "react"
import { getProducts, setFilters } from "../redux/productSlice"
import Spinner from "../components/Spinner"

const Shop = () => {
    const { products, isLoading, filters } = useAppSelector((store) => store.products)
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

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    return (
        <Container maxWidth="lg">
            <Grid container sx={{ my: 10, justifyContent: "space-between" }}>
                <Grid item xs={2} sx={{ display: { xs: "none", md: "block" } }}>
                    <CategorySidebar />
                </Grid>

                <Grid
                    container
                    item
                    spacing={9}
                    xs={12}
                    md={9}
                    sx={{
                        position: "relative",
                        justifyContent: { xs: "center", md: "flex-start" },
                        paddingLeft: 3,
                    }}
                >
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
                                return filters[filter as keyof typeof filters].map(
                                    (f) => {
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
                                                        handleFilterDelete(
                                                            f as string,
                                                            filter
                                                        )
                                                    }
                                                />
                                            )
                                    }
                                )
                            })}
                        </Stack>
                    </Box>

                    <Grid
                        item
                        container
                        spacing={3}
                        xs={12}
                        sx={{
                            justifyContent: { xs: "center", md: "flex-start" },
                            paddingLeft: 3,
                            marginTop: 2,
                        }}
                    >
                        {!isLoading ? (
                            products.length > 0 ? (
                                products.map((product) => {
                                    return (
                                        <Grid item xs={9} sm={5} md={4} key={product._id}>
                                            <Item product={product} />
                                        </Grid>
                                    )
                                })
                            ) : (
                                <Typography variant="h2">No products found.</Typography>
                            )
                        ) : (
                            <Spinner />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Shop
