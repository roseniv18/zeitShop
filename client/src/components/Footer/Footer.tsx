import {
    Container,
    Typography,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
} from "@mui/material"
import PhoneIcon from "@mui/icons-material/Phone"
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid"
import EmailIcon from "@mui/icons-material/Email"
import MailingList from "./MailingList"
import { FaCcVisa, FaCcMastercard } from "react-icons/fa"
import { SiAmericanexpress } from "react-icons/si"
import { useLocation } from "react-router"
import { Link } from "react-router-dom"

const Footer = () => {
    const location = useLocation()

    const aboutUs: string[] = [
        "About us",
        "Shipping",
        "Terms and conditions",
        "Shops",
        "Services",
    ]

    const workingHours: { [key: string]: string } = {
        Monday: "09:00-18:00",
        Tuesday: "09:00-18:00",
        Wednesday: "09:00-18:00",
        Thursday: "09:00-18:00",
        Friday: "09:00-18:00",
        Saturday: "09:00-16:00",
        Sunday: "CLOSED",
    }

    const contactUs: { text: string; icon: JSX.Element }[] = [
        {
            text: "+839 143 898",
            icon: <PhoneAndroidIcon />,
        },
        {
            text: "+839 143 899",
            icon: <PhoneIcon />,
        },
        {
            text: "office@zeitshop.com",
            icon: <EmailIcon />,
        },
    ]

    return (
        <footer className="footer">
            <Container
                maxWidth={false}
                sx={{
                    position: "relative",
                    bgcolor: "#212121",
                    pt: 5,
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "25px",
                        right: "50px",
                        color: "#eeeeee",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{
                            marginRight: "1em",
                            fontSize: "15px",
                            display: { xs: "none", md: "block" },
                        }}
                    >
                        Pay with:{" "}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <FaCcVisa
                            color="#226be9"
                            size={42}
                            className="footer-card-icon"
                        />
                        <FaCcMastercard
                            color="#e96822"
                            size={42}
                            className="footer-card-icon"
                        />
                        <SiAmericanexpress
                            color="#61bff1"
                            size={36}
                            className="footer-card-icon"
                        />
                    </Box>
                </Box>
                <Container maxWidth="lg" sx={{ py: 3, color: "primary.contrastText" }}>
                    {location.pathname === "/" || location.pathname === "/contact-us" ? (
                        <MailingList />
                    ) : (
                        <></>
                    )}
                    <Grid container>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                variant="h5"
                                sx={{ color: "primary.contrastText" }}
                            >
                                About Us
                            </Typography>
                            <Divider
                                sx={{
                                    width: "200px",
                                    height: "1px",
                                    bgcolor: "#9e9e9e",
                                    mt: 1,
                                    mb: 3,
                                }}
                            />
                            <nav aria-label="about-us">
                                <List>
                                    {aboutUs.map((text, index) => {
                                        return (
                                            <ListItem disablePadding key={index}>
                                                <Link
                                                    to={`${text
                                                        .replace(" ", "-")
                                                        .toLocaleLowerCase()}`}
                                                    style={{
                                                        color: "inherit",
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={text}
                                                        sx={{
                                                            transition: ".18s linear",
                                                            "&:hover": {
                                                                transition: ".18s linear",
                                                                color: "secondary.main",
                                                            },
                                                        }}
                                                    ></ListItemText>
                                                </Link>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </nav>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                variant="h5"
                                sx={{ color: "primary.contrastText" }}
                            >
                                Opening Hours
                            </Typography>
                            <Divider
                                sx={{
                                    width: "200px",
                                    height: "1px",
                                    bgcolor: "primary.light",
                                    mt: 1,
                                    mb: 3,
                                }}
                            />
                            <nav aria-label="opening-hours">
                                <List sx={{ width: "75%" }}>
                                    <Grid container>
                                        {Object.keys(workingHours).map((day, index) => {
                                            return (
                                                <Grid item xs={6} lg={4} key={index}>
                                                    <ListItem
                                                        disablePadding
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            justifyContent:
                                                                "space-between",
                                                        }}
                                                    >
                                                        <ListItemText
                                                            primary={day}
                                                            secondary={workingHours[day]}
                                                            primaryTypographyProps={{
                                                                sx: {},
                                                            }}
                                                            secondaryTypographyProps={{
                                                                sx: {
                                                                    color: "primary.contrastText",
                                                                    fontWeight: 600,
                                                                },
                                                            }}
                                                        ></ListItemText>
                                                    </ListItem>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </List>
                            </nav>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography
                                variant="h5"
                                sx={{ color: "primary.contrastText" }}
                            >
                                Contact Us
                            </Typography>
                            <Divider
                                sx={{
                                    width: "200px",
                                    height: "1px",
                                    bgcolor: "#9e9e9e",
                                    mt: 1,
                                    mb: 3,
                                }}
                            />
                            <nav aria-label="contact-us">
                                <List>
                                    {contactUs.map((el, index) => {
                                        return (
                                            <ListItem disablePadding key={index}>
                                                <ListItemIcon
                                                    sx={{
                                                        minWidth: 0,
                                                        marginRight: "3px",
                                                        color: "secondary.main",
                                                    }}
                                                >
                                                    {el.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={el.text}
                                                ></ListItemText>
                                            </ListItem>
                                        )
                                    })}
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
