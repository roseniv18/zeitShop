import ProductGallery from "../components/Product/ProductGallery"
import { Container } from "@mui/material"
import ProductInfo from "../components/Product/ProductInfo"
import ProductTabs from "../components/Product/ProductTabs"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { useParams } from "react-router"
import { getProduct } from "../redux/productSlice"

const Product = () => {
    const { isLoading, product } = useAppSelector((store) => store.products)
    const dispatch = useAppDispatch()
    const { nameId } = useParams()

    useEffect(() => {
        if (nameId) {
            dispatch(getProduct(nameId))
        }
    }, [nameId])

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <Container
            disableGutters
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                mt: 7,
                p: 0,
                gap: 10,
            }}
            maxWidth="lg"
        >
            <Container
                sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
            >
                <ProductGallery image_urls={product.image_urls} />
                <ProductInfo product={product} />
            </Container>
            <ProductTabs reviewingProduct={product} />
        </Container>
    )
}

export default Product
