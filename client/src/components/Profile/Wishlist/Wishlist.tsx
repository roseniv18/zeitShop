import { Box, Typography } from "@mui/material"
import { useAppSelector } from "../../../redux/store"
import WishlistItem from "./WishlistItem"

const Wishlist = ({ drawerWidth }: { drawerWidth: number }) => {
    const { user } = useAppSelector((store) => store.user)

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
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "18px",
                            width: "100%",
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
