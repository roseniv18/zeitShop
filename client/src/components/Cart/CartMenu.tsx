import generateFullProductName from "../../helpers/generateFullProductName"
import { MenuItem, Button, Container, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../redux/store"
import CartMenuItem from "./CartMenuItem"

const CartMenu = ({ onClose }: { onClose: () => void }) => {
    const { cart } = useAppSelector((store) => store.products)

    return (
        <Container maxWidth="sm" disableGutters>
            {cart.map((item) => {
                const { brand, model, model_info, image_urls, _id } = item
                const img = image_urls[0]
                const name = generateFullProductName(brand, model, model_info, 24)
                return <CartMenuItem name={name} img={img} id={_id} key={_id} />
            })}

            <MenuItem>
                <Button sx={{ minWidth: "100%", my: 0, mx: "auto" }} onClick={onClose}>
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
    )
}

export default CartMenu
