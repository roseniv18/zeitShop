import { Box, Typography } from "@mui/material"
import { useAppSelector } from "../../../redux/store"
import WishlistItem from "./WishlistItem"

const Wishlist = ({ drawerWidth }: { drawerWidth: number }) => {
    const { user } = useAppSelector((store) => store.user)

    return (
        <Box
            sx={{
                bgcolor: "transparent",
                py: 6,
                px: { xs: 3, md: 10 },
                width: { xs: `calc(100%- ${drawerWidth}px)`, xl: "100%" },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "36px",
                    width: "100%",
                }}
            >
                <Typography variant="h3" sx={{ mb: 3 }}>
                    Your Wishlist
                </Typography>
                {user.token && user.wishlist.length > 0 ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "18px",
                            width: "450px",
                        }}
                    >
                        {user.wishlist.map((el) => {
                            return (
                                <WishlistItem
                                    key={el.productId}
                                    item={el}
                                    userId={user._id}
                                />
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
