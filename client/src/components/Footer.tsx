import {
    Container,
    Typography,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material"
import PhoneIcon from "@mui/icons-material/Phone"
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid"
import EmailIcon from "@mui/icons-material/Email"
import MailingList from "./MailingList"
import { useLocation } from "react-router"

const Footer = () => {
    const location = useLocation()

    return (
        <footer>
            <Container maxWidth={false} sx={{ bgcolor: "primary.dark", pt: 5 }}>
                <Container maxWidth="lg" sx={{ py: 3, color: "#fff" }}>
                    {location.pathname === "/" || location.pathname === "/contact-us" ? (
                        <MailingList />
                    ) : (
                        <></>
                    )}
                    <Grid container>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h4">About Us</Typography>
                            <Divider
                                sx={{
                                    width: "200px",
                                    height: "1px",
                                    bgcolor: "#fefefe",
                                    mt: 1,
                                    mb: 3,
                                }}
                            />
                            <nav aria-label="about-us">
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemText primary="About us">
                                            About us
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary="Shipping"></ListItemText>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary="Terms and conditions"></ListItemText>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary="Shops"></ListItemText>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemText primary="Services"></ListItemText>
                                    </ListItem>
                                </List>
                            </nav>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h4">Opening Hours</Typography>
                            <Divider
                                sx={{
                                    width: "200px",
                                    height: "1px",
                                    bgcolor: "#fefefe",
                                    mt: 1,
                                    mb: 3,
                                }}
                            />
                            <nav aria-label="opening-hours">
                                <List sx={{ width: "75%" }}>
                                    <Grid container>
                                        <Grid item xs={12} sm={6} lg={4}>
                                            <ListItem
                                                disablePadding
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <ListItemText
                                                    primary="Monday"
                                                    secondary="09:00-18:00"
                                                    primaryTypographyProps={{
                                                        sx: {},
                                                    }}
                                                    secondaryTypographyProps={{
                                                        sx: {
                                                            color: "#ffffff",
                                                            fontWeight: 600,
                                                        },
                                                    }}
                                                ></ListItemText>
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={12} sm={6} lg={4}>
                                            <ListItem
                                                disablePadding
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <ListItemText
                                                    primary="Tuesday"
                                                    secondary="09:00-18:00"
                                                    primaryTypographyProps={{
                                                        sx: {},
                                                    }}
                                                    secondaryTypographyProps={{
                                                        sx: {
                                                            color: "#ffffff",
                                                            fontWeight: 600,
                                                        },
                                                    }}
                                                ></ListItemText>
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={12} sm={6} lg={4}>
                                            <ListItem
                                                disablePadding
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <ListItemText
                                                    primary="Wednesday"
                                                    secondary="09:00-18:00"
                                                    primaryTypographyProps={{
                                                        sx: {},
                                                    }}
                                                    secondaryTypographyProps={{
                                                        sx: {
                                                            color: "#ffffff",
                                                            fontWeight: 600,
                                                        },
                                                    }}
                                                ></ListItemText>
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={12} sm={6} lg={4}>
                                            <ListItem
                                                disablePadding
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <ListItemText
                                                    primary="Thursday"
                                                    secondary="09:00-18:00"
                                                    primaryTypographyProps={{
                                                        sx: {},
                                                    }}
                                                    secondaryTypographyProps={{
                                                        sx: {
                                                            color: "#ffffff",
                                                            fontWeight: 600,
                                                        },
                                                    }}
                                                ></ListItemText>
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={12} sm={6} lg={4}>
                                            <ListItem
                                                disablePadding
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <ListItemText
                                                    primary="Friday"
                                                    secondary="09:00-18:00"
                                                    primaryTypographyProps={{
                                                        sx: {},
                                                    }}
                                                    secondaryTypographyProps={{
                                                        sx: {
                                                            color: "#ffffff",
                                                            fontWeight: 600,
                                                        },
                                                    }}
                                                ></ListItemText>
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={12} sm={6} lg={4}>
                                            <ListItem
                                                disablePadding
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <ListItemText
                                                    primary="Saturday"
                                                    secondary="09:00-18:00"
                                                    primaryTypographyProps={{
                                                        sx: {},
                                                    }}
                                                    secondaryTypographyProps={{
                                                        sx: {
                                                            color: "#ffffff",
                                                            fontWeight: 600,
                                                        },
                                                    }}
                                                ></ListItemText>
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={12} sm={6} lg={4}>
                                            <ListItem
                                                disablePadding
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <ListItemText
                                                    primary="Sunday"
                                                    secondary="CLOSED"
                                                    primaryTypographyProps={{
                                                        sx: {},
                                                    }}
                                                    secondaryTypographyProps={{
                                                        sx: {
                                                            color: "#ffffff",
                                                            fontWeight: 600,
                                                        },
                                                    }}
                                                ></ListItemText>
                                            </ListItem>
                                        </Grid>
                                    </Grid>
                                </List>
                            </nav>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h4">Contact Us</Typography>
                            <Divider
                                sx={{
                                    width: "200px",
                                    height: "1px",
                                    bgcolor: "#fefefe",
                                    mt: 1,
                                    mb: 3,
                                }}
                            />
                            <nav aria-label="contact-us">
                                <List>
                                    <ListItem disablePadding>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                marginRight: "3px",
                                                color: "#fff",
                                            }}
                                        >
                                            <PhoneAndroidIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="+839 143 898"></ListItemText>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                marginRight: "3px",
                                                color: "#fff",
                                            }}
                                        >
                                            <PhoneIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="+839 143 899"></ListItemText>
                                    </ListItem>
                                    <ListItem disablePadding>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                marginRight: "3px",
                                                color: "#fff",
                                            }}
                                        >
                                            <EmailIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="office@zeitshop.com"></ListItemText>
                                    </ListItem>
                                </List>
                            </nav>
                        </Grid>
                    </Grid>
                </Container>
            </Container>
        </footer>
    )
}

export default Footer
