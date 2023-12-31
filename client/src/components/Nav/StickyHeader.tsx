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

function StickyHeader() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const [isFixed, setIsFixed] = useState<boolean>(false)
    const [posY, setPosY] = useState<number>(window.scrollY)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    useEffect(() => {
        const handleScrollY = () => {
            setPosY(window.scrollY)
        }

        window.addEventListener("scroll", handleScrollY)

        return () => {
            window.removeEventListener("scroll", handleScrollY)
        }
    }, [])

    useEffect(() => {
        if (posY > 200) {
            setIsFixed(true)
        } else {
            setIsFixed(false)
        }
    }, [posY])

    return (
        <AppBar
            className={`${isFixed ? "header-sticky" : "header"}`}
            sx={{
                backgroundColor: "primary.main",
                color: "background.default",
                minHeight: "50px",
                height: "50px",
            }}
        >
            <Container maxWidth="lg" sx={{ minHeight: "50px", height: "50px" }}>
                <Toolbar
                    disableGutters
                    sx={{ minHeight: "50px !important", height: "50px" }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                            minHeight: "50px",
                            height: "50px",
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
                                    color: "background.default",
                                    display: "block",
                                    ":hover": {
                                        color: "#d8d8d8",
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

                    <Box sx={{ display: { xs: "flex" }, flexDirection: "row" }}>
                        <UserMenu />
                        <CartMenu />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default StickyHeader
