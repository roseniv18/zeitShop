import { Container, Typography, Button } from "@mui/material"
import CartItem from "../components/Cart/CartItem"
import { useAppSelector } from "../redux/store"
import { Link } from "react-router-dom"
import CartTotal from "../components/CartTotal"

const Cart = () => {
    const { cart } = useAppSelector((store) => store.products)

    return (
        <>
            {cart.length > 0 ? (
                <Typography variant="h2" sx={{ textAlign: "center", my: 6 }}>
                    Your Cart
                </Typography>
            ) : (
                <></>
            )}

            <Container sx={{ my: 6 }} disableGutters>
                <Container
                    sx={{
                        py: 3,
                        borderTop: "1px solid #999",
                        borderBottom: "1px solid #999",
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                    }}
                    disableGutters
                >
                    {cart.length > 0 ? (
                        cart.map((item) => {
                            const { _id } = item
                            return <CartItem key={_id} item={item} />
                        })
                    ) : (
                        <>
                            <Typography variant="h2" textAlign="center">
                                Cart Is Empty
                            </Typography>
                            <Button
                                sx={{ maxWidth: "100px", my: 0, mx: "auto" }}
                                variant="contained"
                            >
                                <Link
                                    to="/products"
                                    style={{ color: "inherit", textDecoration: "none" }}
                                >
                                    Fill It
                                </Link>
                            </Button>
                        </>
                    )}
                </Container>
            </Container>
            {cart.length > 0 ? <CartTotal /> : <></>}
        </>
    )
}

export default Cart
