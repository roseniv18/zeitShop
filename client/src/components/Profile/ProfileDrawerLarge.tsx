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
} from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"
import useLogout from "../../hooks/useLogout"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { setActiveTab } from "../../redux/miscSlice"

type PropTypes = {
    list: string[]
    listIconPairs: Map<string, JSX.Element>
}

const ProfileDrawerLarge = ({ list, listIconPairs }: PropTypes) => {
    const { activeTab, drawerWidth } = useAppSelector((store) => store.misc)
    const dispatch = useAppDispatch()
    const logout = useLogout()

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                }}
            ></AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                    position: "relative",
                    top: 0,
                    left: 0,
                }}
                PaperProps={{
                    sx: {
                        height: "80vh",
                        position: "relative",
                        top: 0,
                        bgcolor: "transparent",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
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
                            <ListItemButton onClick={() => dispatch(setActiveTab(text))}>
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
            </Drawer>
        </Box>
    )
}

export default ProfileDrawerLarge
