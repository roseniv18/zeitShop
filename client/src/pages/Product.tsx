import ProductGallery from "../components/Product/ProductGallery"
import { Button, Container } from "@mui/material"
import ProductInfo from "../components/Product/ProductInfo"
import ProductTabs from "../components/Product/ProductTabs"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { useNavigate, useParams } from "react-router"
import { getProduct } from "../redux/productSlice"
import Spinner from "../components/Spinner"

const Product = () => {
    const { isLoading, product } = useAppSelector((store) => store.products)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { nameId } = useParams()

    useEffect(() => {
        if (nameId) {
            dispatch(getProduct(nameId))
        }
    }, [nameId])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <Container
            disableGutters
            sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                mt: 7,
                p: 0,
                gap: 10,
            }}
            maxWidth="lg"
        >
            <Button
                onClick={() => navigate(-1)}
                variant="outlined"
                sx={{
                    position: "absolute",
                    top: "-3%",
                    gap: "12px",
                    display: { xs: "none", lg: "flex" },
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <span style={{ fontWeight: 600 }}>&#8592;</span> Back
            </Button>
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
