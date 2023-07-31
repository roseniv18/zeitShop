import { Container, Typography, IconButton } from "@mui/material"
import { CartProduct } from "../../types/CartProduct"
import generateFullProductName from "../../helpers/generateFullProductName"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle"
import { useAppDispatch } from "../../redux/store"
import { decrease, increase } from "../../redux/productSlice"
import { serverURL } from "../../helpers/serverURL"

const CartItem = ({ item }: { item: CartProduct }) => {
    const { image_urls, price, amount, model, brand, model_info, _id } = item
    const img = image_urls[0]
    const name = generateFullProductName(brand, model, model_info)
    const dispatch = useAppDispatch()

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    mx: 0,
                    gap: ".75em",
                    maxWidth: { xs: "200px", sm: "300px", md: "600px" },
                }}
                disableGutters
            >
                <img
                    src={`${serverURL}/images/${img}`}
                    alt={name}
                    className="cart-item-img"
                ></img>
                <Typography
                    sx={{
                        fontSize: { xs: "14px", md: "18px" },
                    }}
                >
                    {name}
                </Typography>
            </Container>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <IconButton
                    color="primary"
                    size="small"
                    aria-label="decrease"
                    onClick={() => dispatch(decrease(_id))}
                >
                    <RemoveCircleIcon />
                </IconButton>
                <Typography variant="h6" sx={{ fontSize: { xs: "14px", md: "18px" } }}>
                    x{amount}
                </Typography>
                <IconButton
                    color="primary"
                    size="small"
                    aria-label="increase"
                    onClick={() => dispatch(increase(_id))}
                >
                    <AddCircleIcon />
                </IconButton>
            </div>

            <Typography sx={{ fontSize: { xs: "14px", md: "18px" } }}>
                € {(price * amount).toFixed(2)}
            </Typography>
        </Container>
    )
}

export default CartItem
