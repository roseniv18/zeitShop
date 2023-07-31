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
        <Container disableGutters sx={{ px: 1 }}>
            <Link
                to={`/product/${url}`}
                style={{ color: "inherit", textDecoration: "none" }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        cursor: "pointer",
                    }}
                >
                    <img
                        loading="lazy"
                        src={`${serverURL}/images/${img}`}
                        alt=""
                        className="cart-item-img"
                    />
                    <Typography overflow="auto" fontWeight={500}>
                        {name}
                    </Typography>
                    <Typography>€ {price.toFixed(2)}</Typography>
                </Box>
            </Link>
        </Container>
    )
}

export default SearchItem
