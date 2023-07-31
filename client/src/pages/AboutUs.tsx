import { Container, Typography, Box } from "@mui/material"
import { serverURL } from "../helpers/serverURL"

const AboutUs = () => {
    return (
        <Container>
            <Typography variant="h1" textAlign={"center"} sx={{ my: 9 }}>
                About us
            </Typography>
            <Container
                maxWidth="md"
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: "120px",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                    <Typography sx={{ lineHeight: 1.8 }}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Voluptatem repellendus culpa voluptatum totam incidunt aut, fugit
                        nihil id at modi <strong>facilis</strong> ipsum odio aliquam
                        dolor. Blanditiis odit sunt suscipit, tempora dolor quam illum
                        illo nihil eos neque, a repellat modi.
                    </Typography>
                    <Typography sx={{ lineHeight: 1.8 }}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Voluptatem repellendus culpa voluptatum totam incidunt aut, fugit
                        nihil id at modi facilis ipsum odio aliquam dolor. Blanditiis odit
                        sunt suscipit, <strong>tempora</strong> dolor quam illum illo
                        nihil eos neque, a repellat modi.
                    </Typography>
                </Box>

                <img
                    className="about-us-img"
                    src={`${serverURL}/images/about-us.jpg`}
                    alt="about-us"
                />
            </Container>
        </Container>
    )
}

export default AboutUs
