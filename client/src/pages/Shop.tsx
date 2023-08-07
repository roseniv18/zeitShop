import { useState } from "react"
import CategorySidebar from "../components/CategorySidebar"
import { Grid, Container, Typography } from "@mui/material"
import Item from "../components/Item"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { useEffect } from "react"
import { getProducts } from "../redux/productSlice"
import Spinner from "../components/Spinner"
import { CategorySidebarMobile } from "../components/CategorySidebarMobile"
import { useParams } from "react-router"
import ActiveFilters from "../components/ActiveFilters"
import Sort from "../components/Sort"

const Shop = () => {
    const { products, isLoading } = useAppSelector((store) => store.products)
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
    const dispatch = useAppDispatch()
    const { brand } = useParams()

    useEffect(() => {
        if (brand) {
            dispatch(getProducts({ filters: { brand: [brand] } }))
            return
        }
        dispatch(getProducts({}))
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <Container maxWidth="lg">
            {screenWidth < 900 ? <CategorySidebarMobile /> : <></>}

            <Grid container sx={{ my: 10, justifyContent: "space-between" }}>
                {screenWidth >= 900 ? (
                    <Grid item xs={2} sx={{ display: { xs: "none", md: "block" } }}>
                        <CategorySidebar />
                    </Grid>
                ) : (
                    <></>
                )}

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
                    <ActiveFilters />
                    <Sort />
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
                                        <Grid
                                            item
                                            xs={9}
                                            sm={5}
                                            md={4}
                                            key={product._id}
                                            sx={{ height: "420px" }}
                                        >
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
