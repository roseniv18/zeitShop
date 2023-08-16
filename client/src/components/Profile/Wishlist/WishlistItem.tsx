import { Typography, Button, Paper } from "@mui/material"
import { useAppDispatch } from "../../../redux/store"
import { removeFromWishlist } from "../../../redux/userSlice"
import { serverURL } from "../../../helpers/serverURL"
import { Link } from "react-router-dom"

type PropTypes = {
    item: {
        productName: string
        image: string
        productId: string
    }

    userId: string
}

const WishlistItem = ({ item, userId }: PropTypes) => {
    const dispatch = useAppDispatch()

    return (
        <Paper
            elevation={3}
            sx={{
                p: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
            }}
        >
            <img
                src={`${serverURL}/images/${item.image}`}
                alt={item.productName}
                className="cart-item-img"
            />
            <Typography>
                <Link to="" style={{ color: "inherit", textDecoration: "none" }}>
                    {item.productName}
                </Link>
            </Typography>
            <Button
                onClick={() =>
                    dispatch(
                        removeFromWishlist({
                            _id: userId,
                            productId: item.productId,
                        })
                    )
                }
            >
                Remove
            </Button>
        </Paper>
    )
}

export default WishlistItem
