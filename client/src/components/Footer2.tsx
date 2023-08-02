import { Container, Box, Typography } from "@mui/material"

const Footer2 = () => {
    const date: Date = new Date()

    return (
        <footer className="footer-2">
            <Container
                sx={{
                    color: "#eee",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        margin: "0 auto",
                    }}
                >
                    <Typography>
                        Made by{" "}
                        <a
                            href="https://github.com/roseniv18"
                            target="_blank"
                            rel="noreferrer"
                            className="rosen-ivanov"
                        >
                            Rosen Ivanov
                        </a>
                    </Typography>
                </Box>
                <Box>© {date.getFullYear()}</Box>
            </Container>
        </footer>
    )
}

export default Footer2
