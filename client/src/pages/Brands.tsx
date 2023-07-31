import { Typography, Grid, Container } from "@mui/material"

const Brands = () => {
    return (
        <Container>
            <Typography variant="h2">Brands</Typography>
            <Grid container>
                <Grid item>Casio</Grid>
                <Grid item>Seiko</Grid>
                <Grid item>Orient</Grid>
                <Grid item>Citizen</Grid>
            </Grid>
        </Container>
    )
}

export default Brands
