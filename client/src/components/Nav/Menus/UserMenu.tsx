import { useState, MouseEvent } from "react"
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import { useAppSelector } from "../../../redux/store"
import useLogout from "../../../hooks/useLogout"

const UserMenu = () => {
    const { user } = useAppSelector((store) => store.user)
    const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null)
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

    return (
        <>
            <IconButton
                id="user-btn"
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
                    Object.keys(loggedInMenuItems).map((item: string, index) => {
                        const keyType = item as keyof typeof loggedInMenuItems
                        const itemOnClickFunc: () => void =
                            loggedInMenuItems[keyType].action
                        const itemIcon: JSX.Element = loggedInMenuItems[keyType].icon
                        return (
                            <MenuItem onClick={itemOnClickFunc} key={index}>
                                <ListItemIcon>{itemIcon}</ListItemIcon>
                                <ListItemText>{item}</ListItemText>
                            </MenuItem>
                        )
                    })
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
        </>
    )
}

export default UserMenu
