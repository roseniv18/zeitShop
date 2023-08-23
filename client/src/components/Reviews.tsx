import { Button } from "@mui/material"
import Review from "./Review"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { setIsAddingReview } from "../redux/miscSlice"
import AddReviewForm from "./AddReviewForm"
import Overlay from "./Overlay"
import { Product } from "../types/Product"

const Reviews = ({ reviewingProduct }: { reviewingProduct: Product }) => {
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
            <Review />
            <Review />
            <Review />
            <Review />
            <Review />
        </section>
    )
}

export default Reviews
