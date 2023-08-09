import { useEffect, useState } from "react"
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    MenuItem,
    Link,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"
import { Link as RouterLink } from "react-router-dom"
import UserMenu from "./Menus/UserMenu"
import CartMenu from "./Menus/CartMenu"

const pages = ["About Us", "Products", "Brands", "Blog", "Contact Us"]

function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    return (
        <AppBar
            position="static"
            className={`header`}
            sx={{
                backgroundColor: "background.default",
                color: "primary.main",
                minHeight: "40px",
                height: "40px",
                borderBottom: "1px solid #ddd",
            }}
        >
            <Container maxWidth="lg" sx={{ minHeight: "40px", height: "40px" }}>
                <Toolbar
                    disableGutters
                    sx={{ minHeight: "40px !important", height: "40px" }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                            minHeight: "40px",
                            height: "40px",
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {/* MOBILE LINKS */}
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography
                                        sx={{
                                            textAlign: "center",
                                        }}
                                    >
                                        <Link
                                            style={{
                                                color: "inherit",
                                                textDecoration: "none",
                                            }}
                                            component={RouterLink}
                                            to={`/${page
                                                .toLocaleLowerCase()
                                                .replace(" ", "-")}`}
                                        >
                                            {page}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <HourglassEmptyIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        zeitShop
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {/* DESKTOP LINKS */}
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    color: "primary.main",
                                    display: "block",
                                    ":hover": {
                                        color: "info.main",
                                    },
                                }}
                            >
                                <Link
                                    style={{ color: "inherit", textDecoration: "none" }}
                                    component={RouterLink}
                                    to={`/${page.toLocaleLowerCase().replace(" ", "-")}`}
                                >
                                    {page}
                                </Link>
                            </Button>
                        ))}
                    </Box>

                    <Box
                        sx={{ display: { xs: "flex", md: "none" }, flexDirection: "row" }}
                    >
                        <UserMenu />
                        <CartMenu />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Navbar
