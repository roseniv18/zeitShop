import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { setActiveTab } from "../../redux/miscSlice"
import useLogout from "../../hooks/useLogout"
import {
    Box,
    Drawer,
    CssBaseline,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import LogoutIcon from "@mui/icons-material/Logout"

type PropTypes = {
    list: string[]
    listIconPairs: Map<string, JSX.Element>
}

export default function ProfileDrawerMobile({ list, listIconPairs }: PropTypes) {
    const { activeTab, drawerWidth } = useAppSelector((store) => store.misc)
    const dispatch = useAppDispatch()
    const logout = useLogout()
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const handleItemClick = (item: string) => {
        setMobileOpen(!mobileOpen)
        dispatch(setActiveTab(item))
    }

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    My Profile
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {list.map((text, index) => (
                    <ListItem
                        key={text}
                        disablePadding
                        sx={{
                            bgcolor: text === activeTab ? "#e2e0e0" : "transparent",
                        }}
                    >
                        <ListItemButton onClick={() => handleItemClick(text)}>
                            <ListItemIcon>{listIconPairs.get(text)}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {["Logout"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => logout()}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    )

    const container = window !== undefined ? () => document.body : undefined

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="absolute"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    top: "auto",
                    left: 0,
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        My profile
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, p: 3 }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    )
}
