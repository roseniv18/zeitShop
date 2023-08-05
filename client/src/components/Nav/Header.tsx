import { Container, Box, Toolbar, Typography, AppBar } from "@mui/material"
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"
import SearchBar from "./SearchBar"
import CartMenu from "./Menus/CartMenu"
import UserMenu from "./Menus/UserMenu"

export default function Header() {
    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar
                    disableGutters
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <HourglassEmptyIcon sx={{ mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                            }}
                        >
                            zeitShop
                        </Typography>
                    </Box>
                    <SearchBar />
                    <Box
                        sx={{ display: { xs: "none", md: "flex" }, flexDirection: "row" }}
                    >
                        <UserMenu />
                        <CartMenu />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
