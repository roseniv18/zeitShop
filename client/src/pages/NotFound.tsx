import { Container, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <Container maxWidth="lg" disableGutters>
            <Typography variant="h2">Page Not Found!</Typography>
            <Button variant="contained" size="large" onClick={() => navigate(-1)}>
                Go back
            </Button>
        </Container>
    )
}

export default NotFound
