import {
    Paper,
    List,
    ListItem,
    Divider,
    Container,
    Typography,
    Button,
} from "@mui/material"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { clearCart } from "../redux/productSlice"

const CartTotal = () => {
    const { cart } = useAppSelector((store) => store.products)
    const dispatch = useAppDispatch()

    const subtotal: number = cart.reduce((acc, curr) => acc + curr.price * curr.amount, 0)
    const shipping_fee: number = 5.99

    const defaultFlexStyling = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    }

    return (
        <Container maxWidth="xs" sx={{ mb: 9 }}>
            <Paper>
                <Container sx={{ py: 3 }}>
                    <List>
                        <ListItem sx={{ px: 0, py: 0 }}>
                            <Container sx={defaultFlexStyling} disableGutters>
                                <Typography variant="h6">Subtotal: </Typography>
                                <Typography variant="h6">
                                    € {subtotal.toFixed(2)}{" "}
                                </Typography>
                            </Container>
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                            <Container sx={defaultFlexStyling} disableGutters>
                                <Typography>Shipping fee: </Typography>
                                <Typography>€ {shipping_fee.toFixed(2)} </Typography>
                            </Container>
                        </ListItem>
                        <Divider sx={{ my: 3 }} />
                        <ListItem sx={{ px: 0 }}>
                            <Container sx={defaultFlexStyling} disableGutters>
                                <Typography variant="h5">Order Total: </Typography>
                                <Typography variant="h5">
                                    € {(subtotal + shipping_fee).toFixed(2)}
                                </Typography>
                            </Container>
                        </ListItem>
                    </List>
                    <Container sx={defaultFlexStyling} disableGutters>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => dispatch(clearCart())}
                        >
                            Clear cart
                        </Button>
                        <Button variant="contained">
                            <Link
                                to="/checkout"
                                style={{ color: "inherit", textDecoration: "none" }}
                            >
                                Proceed to checkout
                            </Link>
                        </Button>
                    </Container>
                </Container>
            </Paper>
        </Container>
    )
}

export default CartTotal
