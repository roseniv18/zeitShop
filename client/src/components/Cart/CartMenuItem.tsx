import { Box, Typography, Button, MenuItem } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch } from "../../redux/store"
import { removeCartItem } from "../../redux/productSlice"
import { serverURL } from "../../helpers/serverURL"

const CartMenuItem = ({ name, img, id }: { name: string; img: string; id: string }) => {
    const dispatch = useAppDispatch()

    return (
        <MenuItem>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "18px",
                }}
            >
                <img
                    src={`${serverURL}/images/${img}`}
                    alt={name}
                    className="cart-item-img"
                />
                <Typography overflow="auto" fontWeight={500}>
                    {name}
                </Typography>
                <Button onClick={() => dispatch(removeCartItem(id))}>
                    <DeleteIcon />
                </Button>
            </Box>
        </MenuItem>
    )
}

export default CartMenuItem
