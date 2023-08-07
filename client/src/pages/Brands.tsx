import { Typography, Grid, Container, Box } from "@mui/material"
import { serverURL } from "../helpers/serverURL"
import { useNavigate } from "react-router"

const Brands = () => {
    const navigate = useNavigate()

    return (
        <Container>
            <Typography variant="h2">Brands</Typography>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Box
                        className="brand-img-container"
                        sx={{
                            maxWidth: "100%",
                            height: "100%",
                            maxHeight: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={`${serverURL}/images/brands/casio.jpg`}
                            className="brand-img"
                            onClick={() => navigate("/products/casio")}
                        />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box
                        className="brand-img-container"
                        sx={{
                            maxWidth: "100%",
                            height: "300px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={`${serverURL}/images/brands/citizen.png`}
                            className="brand-img"
                            onClick={() => navigate("/products/citizen")}
                        />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box
                        className="brand-img-container"
                        sx={{
                            maxWidth: "100%",
                            height: "300px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={`${serverURL}/images/brands/orient.jpg`}
                            className="brand-img"
                            onClick={() => navigate("/products/orient")}
                        />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box
                        className="brand-img-container"
                        sx={{
                            maxWidth: "100%",
                            height: "300px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={`${serverURL}/images/brands/seiko.png`}
                            className="brand-img"
                            onClick={() => navigate("/products/seiko")}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Brands
