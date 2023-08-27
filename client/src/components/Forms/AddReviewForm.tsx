import { useState, ChangeEvent } from "react"
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Paper,
    Rating,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import StarsIcon from "@mui/icons-material/Stars"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { setIsAddingReview } from "../../redux/miscSlice"
import { Review } from "../../types/Review"
import { addReview, setUserAlert } from "../../redux/userSlice"
import { Product } from "../../types/Product"

const AddReviewForm = ({
    reviewingProduct,
    rating,
}: {
    reviewingProduct: Product
    rating: number
}) => {
    const { user } = useAppSelector((store) => store.user)
    const { firstName, lastName } = user
    const [review, setReview] = useState<Partial<Review>>({
        rating,
        userName: `${firstName} ${lastName}`,
        comment: "",
    })
    const image: string = reviewingProduct.image_urls[0]
    const productId = reviewingProduct._id
    const { fullName } = reviewingProduct
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setReview((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!user || !user.token) {
            navigate("/login")
            return
        }

        if (!review.rating || review.rating < 1) {
            dispatch(
                setUserAlert({ type: "error", msg: "Rating is required!", show: true })
            )
            return
        }

        if (!review.userName) {
            dispatch(
                setUserAlert({ type: "error", msg: "Username is required!", show: true })
            )
            return
        }

        if (user && user.token) {
            const { rating, userName, comment } = review
            const newReview = {
                rating,
                userName,
                comment,
                productName: fullName,
                productId,
                image,
            }
            dispatch(addReview({ _id: user._id, review: { ...newReview } }))
            return
        }
    }

    return (
        <Paper
            sx={{
                px: 4,
                py: 3,
                maxWidth: { xs: "100%", sm: "75%", md: "50%", lg: "30%" },
            }}
            className="add-review-form"
        >
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <StarsIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add a review
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <Typography component="legend">Your rating:</Typography>
                    <Rating
                        name="rating"
                        value={review.rating}
                        precision={0.5}
                        onChange={handleChange}
                    />
                </Box>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ my: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                label="Your name"
                                type="text"
                                name="userName"
                                onChange={handleChange}
                                value={review.userName}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="comment"
                                label="Your comment"
                                type="text"
                                onChange={handleChange}
                                value={review.comment}
                                id="comment"
                                multiline
                                minRows={6}
                                maxRows={8}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {" "}
                        Add review
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Button
                                variant="text"
                                onClick={() => dispatch(setIsAddingReview(false))}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Paper>
    )
}

export default AddReviewForm
