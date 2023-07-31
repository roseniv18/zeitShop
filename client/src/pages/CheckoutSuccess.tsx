import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { Container, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"

const CheckoutSuccess = () => {
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 3,
            }}
        >
            <CheckCircleIcon sx={{ fontSize: 90, color: "primary.main", mb: 5 }} />
            <Typography variant="h2">Thank you for your purchase!</Typography>
            <Typography
                variant="h6"
                sx={{ mb: 5, maxWidth: "600px", textAlign: "center" }}
            >
                Check your email for confirmation and more details regarding your
                purchase.
            </Typography>
            <Button sx={{ my: 0, mx: "auto" }} variant="contained" size="large">
                <Link to="/products" style={{ color: "inherit", textDecoration: "none" }}>
                    COntinue shopping
                </Link>
            </Button>
        </Container>
    )
}

export default CheckoutSuccess
