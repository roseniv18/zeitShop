import { Container, Typography } from "@mui/material"

const ContactUs = () => {
    return (
        <Container>
            <Typography variant="h1" textAlign={"center"} sx={{ my: 9 }}>
                Contact us
            </Typography>
            <Container
                maxWidth="md"
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: "120px",
                }}
            ></Container>
        </Container>
    )
}

export default ContactUs
