import { Paper, Typography, Container, Divider } from "@mui/material"
import { Product } from "../types/Product"
import { Link } from "react-router-dom"
import { serverURL } from "../helpers/serverURL"

const Item = ({ product }: { product: Product }) => {
    const { nameId, brand, model, model_info, image_urls, price } = product
    let name = `${brand} ${model} ${model_info}`.toLocaleUpperCase()

    if (name.length > 30) {
        name = name.substring(0, 30).concat("...")
    }
    return (
        <Paper>
            <Link to={`/product/${nameId}`}>
                <img
                    src={`${serverURL}/images/${image_urls[0]}`}
                    alt={`${brand}`}
                    className="item-img"
                />
            </Link>

            <Divider />
            <Container sx={{ textAlign: "center", py: 2 }}>
                <Typography
                    sx={{
                        fontWeight: 500,
                        ":hover": { cursor: "pointer" },
                        fontSize: 18,
                    }}
                >
                    {name}
                </Typography>
                <Typography variant="h6" sx={{ marginTop: 1 }}>
                    € {price.toFixed(2)}
                </Typography>
            </Container>
        </Paper>
    )
}

export default Item
