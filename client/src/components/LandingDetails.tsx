import { Container, Box, Typography, Divider } from "@mui/material"

const LandingDetails = () => {
    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                alignItems: { xs: "center", lg: "inherit" },
                gap: { xs: "20px", lg: 0 },
                justifyContent: "space-between",
            }}
            className="landing-details"
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: { xs: "80%", md: "60%", lg: "300px" },
                    gap: "12px",
                }}
            >
                <Typography variant="h6" alignSelf="flex-start">
                    Lorem ipsum dolor sit.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#5e5e5e" }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam in
                    iusto molestias, nobis ad dolorum reprehenderit, aliquid repellat
                    expedita, fugiat explicabo aspernatur debitis deserunt et?
                </Typography>
                <Divider
                    orientation="horizontal"
                    sx={{
                        width: "75%",
                        bgcolor: "#212121",
                        display: { lg: "none" },
                        alignSelf: "flex-start",
                        mt: 3,
                    }}
                />
            </Box>
            <Divider
                orientation="vertical"
                sx={{
                    height: "inherit",
                    width: "0.7px",
                    bgcolor: "#212121",
                }}
            />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxWidth: { xs: "80%", md: "60%", lg: "300px" },
                    gap: "12px",
                }}
            >
                <Typography variant="h6" alignSelf="flex-start">
                    Lorem ipsum dolor sit.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#5e5e5e" }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam in
                    iusto molestias, nobis ad dolorum reprehenderit, aliquid repellat
                    expedita, fugiat explicabo aspernatur debitis deserunt et?
                </Typography>
                <Divider
                    orientation="horizontal"
                    sx={{
                        width: "75%",
                        bgcolor: "#212121",
                        display: { lg: "none" },
                        alignSelf: "flex-start",
                        mt: 3,
                    }}
                />
            </Box>
            <Divider
                orientation="vertical"
                sx={{
                    height: "inherit",
                    width: "0.7px",
                    bgcolor: "#212121",
                }}
            />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxWidth: { xs: "80%", md: "60%", lg: "300px" },
                    gap: "12px",
                }}
            >
                <Typography variant="h6" alignSelf="flex-start">
                    Lorem ipsum dolor sit.
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#5e5e5e" }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam in
                    iusto molestias, nobis ad dolorum reprehenderit, aliquid repellat
                    expedita, fugiat explicabo aspernatur debitis deserunt et?
                </Typography>
            </Box>
        </Container>
    )
}

export default LandingDetails
