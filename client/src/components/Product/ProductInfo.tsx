import { useState } from "react"
import { Container, Typography, Box, Button, Rating } from "@mui/material"
import Overlay from "../Overlay"
import AddReviewForm from "../AddReviewForm"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { addToCart } from "../../redux/productSlice"
import { Product } from "../../types/Product"
import generateFullProductName from "../../helpers/generateFullProductName"
import { Link } from "react-router-dom"
import { addToWishlist, removeFromWishlist } from "../../redux/userSlice"
import { setIsAddingReview } from "../../redux/miscSlice"

const ProductInfo = ({ product }: { product: Product }) => {
    const { user } = useAppSelector((store) => store.user)
    const { isAddingReview } = useAppSelector((store) => store.misc)
    const { brand, model, model_info, price, image_urls } = product
    const dispatch = useAppDispatch()
    const name = generateFullProductName(brand, model, model_info)

    const [rating, setRating] = useState<number | null>(0)

    let isWishlisted = false
    for (let i = 0; i < user.wishlist.length; i++) {
        if (user.wishlist[i].productId === product._id) {
            isWishlisted = true
        }
    }

    const handleChange = (e: any) => {
        setRating(e.target.value)
    }

    return (
        <Container sx={{ display: "flex", flexDirection: "column", p: 0 }}>
            {isAddingReview ? (
                <Overlay children={<AddReviewForm reviewingProduct={product} />} />
            ) : (
                <></>
            )}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                }}
            >
                <Typography variant="h4" sx={{ color: "primary.main" }}>
                    {name}
                </Typography>

                {user._id && user.token ? (
                    isWishlisted ? (
                        <FavoriteIcon
                            sx={{ ":hover": { cursor: "pointer" } }}
                            color="warning"
                            onClick={() =>
                                dispatch(
                                    removeFromWishlist({
                                        _id: user._id,
                                        productId: product._id,
                                    })
                                )
                            }
                        />
                    ) : (
                        <FavoriteBorderIcon
                            sx={{ ":hover": { cursor: "pointer" } }}
                            onClick={() =>
                                dispatch(
                                    addToWishlist({
                                        _id: user._id,
                                        productName: name,
                                        productId: product._id,
                                        image: product.image_urls[0],
                                    })
                                )
                            }
                        />
                    )
                ) : (
                    <Link to="/login">
                        <FavoriteBorderIcon sx={{ ":hover": { cursor: "pointer" } }} />
                    </Link>
                )}
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
                <Typography sx={{ lineHeight: "1.8" }}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
                    dolore totam obcaecati quos corporis, quas quis tempora incidunt culpa
                    laudantium nisi iste est hic modi necessitatibus voluptates atque
                    voluptate illum quasi nesciunt cum repellat libero eos at? Tempora,
                    ipsam quos.
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography>Price: </Typography>
                    <Typography variant="h5" fontWeight={600}>
                        € {price.toFixed(2)}
                    </Typography>
                </Box>
                <Box>
                    <Typography component="legend">Rating: </Typography>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        precision={0.5}
                        onChange={handleChange}
                        onClick={() => dispatch(setIsAddingReview(product))}
                    />
                </Box>
            </Box>
            <Button
                variant="contained"
                sx={{ marginTop: "40px", width: "30%" }}
                startIcon={<ShoppingCartIcon />}
                onClick={() => dispatch(addToCart({ ...product, amount: 1 }))}
            >
                Add to cart
            </Button>
        </Container>
    )
}

export default ProductInfo
