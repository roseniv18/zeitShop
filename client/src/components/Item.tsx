import { Paper, Typography, Container, Divider, Rating, Box, Button } from "@mui/material"
import { Product } from "../types/Product"
import { useNavigate } from "react-router-dom"
import { serverURL } from "../helpers/serverURL"
import { useAppDispatch } from "../redux/store"
import { addToCart } from "../redux/productSlice"

const Item = ({ product }: { product: Product }) => {
    const { nameId, brand, model, model_info, image_urls, price } = product
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    let name = `${brand} ${model} ${model_info}`.toLocaleUpperCase()

    if (name.length > 20) {
        name = name.substring(0, 20).concat("...")
    }
    return (
        <Paper
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: ".18s linear",
                maxWidth: "250px",
                height: "100%",
                "&:hover": { transform: "translateY(-3px)", transition: ".18s linear" },
            }}
        >
            <img
                onClick={() => navigate(`/product/${nameId}`)}
                src={`${serverURL}/images/${image_urls[0]}`}
                alt={`${brand}`}
                className="item-img"
            />

            <Divider />
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                    py: 2,
                    width: "100%",
                }}
            >
                <Typography
                    sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        ":hover": { cursor: "pointer" },
                        fontSize: 16,
                        wordBreak: "break-all",
                    }}
                >
                    {name}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Rating
                        name="simple-controlled"
                        value={Math.max(Math.random() * 5, Math.random() * 5)}
                        precision={0.5}
                        readOnly
                    />
                    <Typography>({Math.floor(Math.random() * 50)})</Typography>
                </Box>

                <Typography
                    variant="h6"
                    sx={{
                        marginTop: 1,
                        fontSize: 18,
                        fontWeight: 600,
                        textAlign: "center",
                    }}
                >
                    € {price.toFixed(2)}
                </Typography>

                <Button
                    variant="outlined"
                    onClick={() => dispatch(addToCart({ ...product, amount: 1 }))}
                >
                    Add to cart
                </Button>
            </Container>
        </Paper>
    )
}

export default Item
