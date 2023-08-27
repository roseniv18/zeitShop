import { Button } from "@mui/material"
import Review from "./Review"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { setIsAddingReview } from "../redux/miscSlice"
import AddReviewForm from "./Forms/AddReviewForm"
import Overlay from "./Overlay"
import { Product } from "../types/Product"

const Reviews = ({ reviewingProduct }: { reviewingProduct: Product }) => {
    const { productReviews } = useAppSelector((store) => store.products)
    const { isAddingReview } = useAppSelector((store) => store.misc)
    const dispatch = useAppDispatch()

    return (
        <section id="ratings">
            <Button
                variant="contained"
                sx={{ my: 0, mx: "auto" }}
                size="large"
                onClick={() => dispatch(setIsAddingReview(reviewingProduct))}
            >
                Add Review
            </Button>
            {isAddingReview ? (
                <Overlay
                    children={
                        <AddReviewForm reviewingProduct={reviewingProduct} rating={0} />
                    }
                />
            ) : (
                <></>
            )}

            {productReviews.map((productReview) => {
                const { productId, userName, rating, comment } = productReview
                return (
                    <Review
                        key={productId}
                        userName={userName}
                        rating={rating}
                        comment={comment}
                    />
                )
            })}
        </section>
    )
}

export default Reviews
