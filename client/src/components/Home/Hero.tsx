import { Typography, Container, Button } from "@mui/material"
import { Link } from "react-router-dom"
import { serverURL } from "../../helpers/serverURL"

const Hero = () => {
    return (
        <Container
            maxWidth={false}
            sx={{
                height: { xs: "100%", lg: "86vh" },
                background: `url(${serverURL}/images/bg.avif)`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom",
                py: 9,
            }}
        >
            <Container
                sx={{
                    color: "#e3f2fd",
                    py: 3,
                }}
                maxWidth="lg"
            >
                <Container
                    disableGutters
                    maxWidth="sm"
                    sx={{ display: "flex", flexDirection: "column", m: 0 }}
                >
                    <Typography variant="h1" sx={{ fontSize: { xs: 80, md: 100 } }}>
                        Zeit Shop
                    </Typography>
                    <Typography variant="h5" fontStyle="italic" sx={{ mb: 5 }}>
                        High Quality Watches
                    </Typography>
                    <Typography
                        sx={{ lineHeight: "1.8", color: "#fff", mb: 5 }}
                        variant="h6"
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Asperiores, placeat veritatis! Nihil nesciunt, culpa dicta unde
                        deleniti maiores, voluptas quae inventore, veniam quisquam hic
                        atque non fugiat. Voluptate quae, totam vel debitis illo eaque
                        dolorem nulla quidem nostrum consectetur veniam.
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ maxWidth: { xs: "50%", lg: "25%" } }}
                        size="large"
                    >
                        <Link
                            to="/products"
                            style={{ color: "inherit", textDecoration: "none" }}
                        >
                            Shop now
                        </Link>
                    </Button>
                </Container>
            </Container>
        </Container>
    )
}

export default Hero
