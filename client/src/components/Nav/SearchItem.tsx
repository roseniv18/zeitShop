import { Box, Typography, Container } from "@mui/material"
import { Link } from "react-router-dom"
import { serverURL } from "../../helpers/serverURL"

const SearchItem = ({
    name,
    price,
    img,
    url,
}: {
    name: string
    price: number
    img: string
    url: string
}) => {
    return (
        <Container
            disableGutters
            sx={{
                px: 1,
                transition: ".18s linear",
                minHeight: "120px",
                alignItems: "center",
                "&:hover": {
                    bgcolor: "primary.light",
                    transition: ".18s linear",
                },
            }}
        >
            <Link
                to={`/product/${url}`}
                style={{ color: "inherit", textDecoration: "none" }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "start",
                        py: 1,
                        width: "100%",
                        cursor: "pointer",
                        gap: "18px",
                    }}
                >
                    <img
                        loading="lazy"
                        src={`${serverURL}/images/${img}`}
                        alt=""
                        className="cart-item-img"
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "start",
                            py: 0,
                        }}
                    >
                        <Typography
                            overflow="auto"
                            fontWeight={400}
                            variant="h6"
                            sx={{ textTransform: "capitalize", p: 0 }}
                        >
                            {name}
                        </Typography>
                        <Typography sx={{ fontWeight: 600 }}>
                            € {price.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
            </Link>
        </Container>
    )
}

export default SearchItem
