import { useState, MouseEvent } from "react"
import {
    Container,
    Box,
    Toolbar,
    Typography,
    AppBar,
    IconButton,
    Menu,
    MenuItem,
    Badge,
    ListItemIcon,
    ListItemText,
} from "@mui/material"
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import CartMenu from "../Cart/CartMenu"
import { useAppSelector } from "../../redux/store"
import SearchBar from "./SearchBar"
import { Link, useNavigate } from "react-router-dom"
import useLogout from "../../hooks/useLogout"

export default function Header() {
    const { user } = useAppSelector((store) => store.user)
    const { cart } = useAppSelector((store) => store.products)
    const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null)
    const [cartAnchorEl, setCartAnchorEl] = useState<null | HTMLElement>(null)
    const navigate = useNavigate()
    const logout = useLogout()

    const loggedInMenuItems = {
        Profile: {
            action: () => navigate("/profile"),
            icon: <AccountCircleIcon />,
        },
        "My account": {
            action: () => navigate("/profile"),
            icon: <SettingsIcon />,
        },
        Logout: {
            action: () => logout(),
            icon: <LogoutIcon />,
        },
    }

    const handleUserMenu = (event: MouseEvent<HTMLElement>) => {
        setUserAnchorEl(event.currentTarget)
    }

    const handleUserClose = () => {
        setUserAnchorEl(null)
    }

    const handleCartMenu = (event: MouseEvent<HTMLElement>) => {
        setCartAnchorEl(event.currentTarget)
    }

    const handleCartClose = () => {
        setCartAnchorEl(null)
    }

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
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="user-menu-appbar"
                            aria-haspopup="true"
                            onClick={handleUserMenu}
                            color="inherit"
                        >
                            <AccountCircleIcon
                                sx={{
                                    ":hover": { cursor: "pointer" },
                                    marginRight: "10px",
                                }}
                            />
                        </IconButton>
                        <Menu
                            id="user-menu-appbar"
                            anchorEl={userAnchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(userAnchorEl)}
                            onClose={handleUserClose}
                        >
                            {user.token ? (
                                Object.keys(loggedInMenuItems).map(
                                    (item: string, index) => {
                                        const keyType =
                                            item as keyof typeof loggedInMenuItems
                                        const itemOnClickFunc: () => void =
                                            loggedInMenuItems[keyType].action
                                        const itemIcon: JSX.Element =
                                            loggedInMenuItems[keyType].icon
                                        return (
                                            <MenuItem
                                                onClick={itemOnClickFunc}
                                                key={index}
                                            >
                                                <ListItemIcon>{itemIcon}</ListItemIcon>
                                                <ListItemText>{item}</ListItemText>
                                            </MenuItem>
                                        )
                                    }
                                )
                            ) : (
                                <MenuItem onClick={handleUserClose}>
                                    <Link
                                        to="/login"
                                        style={{
                                            color: "inherit",
                                            textDecoration: "none",
                                        }}
                                    >
                                        <ListItemIcon>
                                            <AccountCircleIcon />
                                        </ListItemIcon>
                                        <ListItemText>Login</ListItemText>
                                    </Link>
                                </MenuItem>
                            )}
                        </Menu>

                        <IconButton
                            aria-label="cart items"
                            aria-controls="cart-menu-appbar"
                            aria-haspopup="true"
                            onClick={handleCartMenu}
                            color="inherit"
                        >
                            {cart.length > 0 ? (
                                <Badge badgeContent={cart.length} color="warning">
                                    <ShoppingCartIcon
                                        sx={{ ":hover": { cursor: "pointer" } }}
                                    />
                                </Badge>
                            ) : (
                                <ShoppingCartIcon
                                    sx={{ ":hover": { cursor: "pointer" } }}
                                />
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
                            <CartMenu onClose={handleCartClose} />
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
