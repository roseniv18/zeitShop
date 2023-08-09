import { Container, Typography, Paper, Button, InputBase } from "@mui/material"
import { serverURL } from "../helpers/serverURL"

const MailingList = () => {
    return (
        <Container
            sx={{
                width: "100%",
                bgcolor: "primary.dark",
                color: "#fff",
                textAlign: "center",
                mb: 15,
                background: `url(${serverURL}/images/bg.jpg`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: { xs: "90%", lg: "50%" },
                    gap: "30px",
                }}
            >
                <Typography variant="h2">Join our newsletter</Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing{" "}
                    <strong>elit</strong>. Voluptate corrupti voluptatem adipisci
                    asperiores laborum labore.
                </Typography>
                <Paper
                    component="form"
                    sx={{
                        p: "6px 18px",
                        display: "flex",
                        alignItems: "center",
                        width: { xs: 350, md: 400 },
                        position: "relative",
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Enter your email"
                        inputProps={{ "aria-label": "enter your email" }}
                    />
                    <Button
                        sx={{
                            height: "100%",
                            position: "absolute",
                            right: 0,
                            bgcolor: "#fff",
                            color: "primary.main",
                            borderLeft: "1px solid #303F9F",
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            "&:hover": {
                                bgcolor: "primary.light",
                                color: "primary.dark",
                            },
                        }}
                    >
                        Subscribe
                    </Button>
                </Paper>
            </Container>
        </Container>
    )
}

export default MailingList
