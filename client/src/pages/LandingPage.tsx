import { Container } from "@mui/material"
import Hero from "../components/Hero"
import LandingDetails from "../components/LandingDetails"

const LandingPage = () => {
    return (
        <Container
            sx={{
                minWidth: "100%",
                mx: 0,
                px: 0,
                display: "flex",
                flexDirection: "column",
                gap: "100px",
            }}
            disableGutters
        >
            <Hero />
            <LandingDetails />
        </Container>
    )
}

export default LandingPage
