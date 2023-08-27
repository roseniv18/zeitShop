import {
    Paper,
    Typography,
    Container,
    Divider,
    Rating,
    Box,
    Button,
    capitalize,
} from "@mui/material"
import { Product } from "../../types/Product"
import { useNavigate } from "react-router-dom"
import { serverURL } from "../../helpers/serverURL"
import { useAppDispatch } from "../../redux/store"
import { addToCart } from "../../redux/productSlice"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import FavoriteIcon from "./FavoriteIcon"

const Item = ({ product }: { product: Product }) => {
    const { _id, nameId, brand, model, model_info, image_urls, price } = product
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    let name = `${brand} ${model} ${model_info}`.toLocaleUpperCase()

    const getShortName = (name: string, maxLen: number) => {
        if (name.length > maxLen) {
            return name.substring(0, maxLen).concat("...")
        }
    }

    return (
        <Paper
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                transition: ".18s linear",
                height: "100%",
                maxWidth: "100%",
                "&:hover": {
                    transform: "translateY(-3px)",
                    transition: ".18s linear",
                    "& .favorite-icon": {
                        position: "absolute",
                        right: "9px",
                        top: "3px",
                        transition: ".18s linear",
                        display: "block !important",
                    },
                },
            }}
        >
            <img
                onClick={() => navigate(`/product/${nameId}`)}
                src={`${serverURL}/images/${image_urls[0]}`}
                alt={`${brand}`}
                style={{ height: "200px", cursor: "pointer" }}
            />

            <Box
                className="favorite-icon"
                style={{ display: "none", transition: ".18s linear" }}
            >
                <FavoriteIcon
                    productId={_id}
                    productName={name}
                    thumbnail={image_urls[0]}
                />
            </Box>

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
                    onClick={() => navigate(`/product/${nameId}`)}
                >
                    {getShortName(name, 18)}
                </Typography>
                <Typography sx={{ textAlign: "center", opacity: 0.5 }}>
                    Brand: {capitalize(brand)}
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
                        value={4.5}
                        precision={0.5}
                        readOnly
                    />
                    <Typography>(18)</Typography>
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
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => dispatch(addToCart({ ...product, amount: 1 }))}
                >
                    Add to cart
                </Button>
            </Container>
        </Paper>
    )
}

export default Item
