import { Container, Typography } from "@mui/material"

const Blog = () => {
    return (
        <Container>
            <Typography variant="h1" textAlign={"center"} sx={{ my: 9 }}>
                Blog
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

export default Blog
