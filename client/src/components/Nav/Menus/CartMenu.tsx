import { MouseEvent, useState } from "react"
import {
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Button,
    Container,
    Typography,
} from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import CartMenuItem from "../../Cart/CartMenuItem"
import generateFullProductName from "../../../helpers/generateFullProductName"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../../redux/store"

const CartMenu = () => {
    const { cart } = useAppSelector((store) => store.products)
    const [cartAnchorEl, setCartAnchorEl] = useState<null | HTMLElement>(null)

    const handleCartMenu = (event: MouseEvent<HTMLElement>) => {
        setCartAnchorEl(event.currentTarget)
    }

    const handleCartClose = () => {
        setCartAnchorEl(null)
    }

    return (
        <>
            <IconButton
                aria-label="cart items"
                aria-controls="cart-menu-appbar"
                aria-haspopup="true"
                onClick={handleCartMenu}
                color="inherit"
            >
                {cart.length > 0 ? (
                    <Badge badgeContent={cart.length} color="warning">
                        <ShoppingCartIcon sx={{ ":hover": { cursor: "pointer" } }} />
                    </Badge>
                ) : (
                    <ShoppingCartIcon sx={{ ":hover": { cursor: "pointer" } }} />
                )}
            </IconButton>

            <Menu
                id="cart-menu-appbar"
                anchorEl={cartAnchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(cartAnchorEl)}
                onClose={handleCartClose}
            >
                <Container maxWidth="sm" disableGutters>
                    {cart.map((item) => {
                        const { brand, model, model_info, image_urls, _id } = item
                        const img = image_urls[0]
                        const name = generateFullProductName(brand, model, model_info, 24)
                        return <CartMenuItem name={name} img={img} id={_id} key={_id} />
                    })}

                    <MenuItem>
                        <Button
                            sx={{ minWidth: "100%", my: 0, mx: "auto" }}
                            onClick={handleCartClose}
                        >
                            {cart.length > 0 ? (
                                <Link
                                    to="/cart"
                                    style={{
                                        color: "inherit",
                                        textDecoration: "none",
                                    }}
                                >
                                    See cart
                                </Link>
                            ) : (
                                <Typography>Empty</Typography>
                            )}
                        </Button>
                    </MenuItem>
                </Container>
            </Menu>
        </>
    )
}

export default CartMenu
