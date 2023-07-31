import { Box, Button, Container, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { removeFromWishlist } from "../../redux/userSlice"
import { serverURL } from "../../helpers/serverURL"

const Wishlist = ({ drawerWidth }: { drawerWidth: number }) => {
    const { user } = useAppSelector((store) => store.user)
    const dispatch = useAppDispatch()

    return (
        <Box
            component="main"
            sx={{
                bgcolor: "transparent",
                py: 6,
                px: { xs: 3, md: 10 },
                width: `calc(100%- ${drawerWidth}px)`,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h3" sx={{ mb: 3 }}>
                    Your Wishlist
                </Typography>
                {user.token && user.wishlist.length > 0 ? (
                    <Box>
                        {user.wishlist.map((el) => {
                            return (
                                <Container
                                    key={el.productId}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src={`${serverURL}/images/${el.image}`}
                                        alt={el.productName}
                                        className="cart-item-img"
                                    />
                                    <Typography>{el.productName}</Typography>
                                    <Button
                                        onClick={() =>
                                            dispatch(
                                                removeFromWishlist({
                                                    _id: user._id,
                                                    productId: el.productId,
                                                })
                                            )
                                        }
                                    >
                                        Remove
                                    </Button>
                                </Container>
                            )
                        })}
                    </Box>
                ) : (
                    <h3>You have not added any items to your wishlist.</h3>
                )}
            </Box>
        </Box>
    )
}

export default Wishlist
