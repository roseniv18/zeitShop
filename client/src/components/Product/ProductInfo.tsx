import { useEffect, useState } from "react"
import { Container, Typography, Box, Button, Rating } from "@mui/material"
import Overlay from "../Overlay"
import AddReviewForm from "../Forms/AddReviewForm"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { addToCart } from "../../redux/slices/productSlice"
import { Product } from "../../types/ProductTypes/Product"
import generateFullProductName from "../../helpers/generateFullProductName"
import { setIsAddingReview } from "../../redux/slices/miscSlice"
import FavoriteIcon from "./FavoriteIcon"
import { Review } from "../../types/UserTypes/Review"

const ProductInfo = ({ product }: { product: Product }) => {
	const { isAddingReview } = useAppSelector((store) => store.misc)
	const { user } = useAppSelector((store) => store.user)
	const { _id, image_urls, brand, model, model_info, price } = product
	const dispatch = useAppDispatch()
	const name = generateFullProductName(brand, model, model_info)

	const userRatingExists: Review | undefined = user.reviews.find(
		(review) => review.productId === product._id
	)

	const userRating: number = userRatingExists ? userRatingExists.rating : 0

	const [rating, setRating] = useState<number>(userRating)
	const [reviewOverlay, setReviewOverlay] = useState<JSX.Element>(
		<Overlay
			children={
				<AddReviewForm
					reviewingProduct={product}
					rating={rating || 0}
				/>
			}
		/>
	)

	const handleChange = (e: any) => {
		setRating(e.target.value)
	}

	useEffect(() => {
		if (isAddingReview) {
			setReviewOverlay(
				<Overlay
					children={
						<AddReviewForm
							reviewingProduct={product}
							rating={rating || 0}
						/>
					}
				/>
			)
		} else {
			setReviewOverlay(<></>)
		}

		return () => {
			setReviewOverlay(<></>)
		}
	}, [rating, isAddingReview])

	return (
		<Container sx={{ display: "flex", flexDirection: "column", p: 0 }}>
			{isAddingReview && reviewOverlay}
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

				<FavoriteIcon
					productId={_id}
					productName={name}
					thumbnail={image_urls[0]}
				/>
			</Box>
			<Box sx={{ marginBottom: "20px" }}>
				<Typography sx={{ lineHeight: "1.8" }}>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Aliquid dolore totam obcaecati quos corporis, quas quis
					tempora incidunt culpa laudantium nisi iste est hic modi
					necessitatibus voluptates atque voluptate illum quasi
					nesciunt cum repellat libero eos at? Tempora, ipsam quos.
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
				sx={{ marginTop: "40px", width: { xs: "40%", sm: "30%" } }}
				startIcon={<ShoppingCartIcon />}
				onClick={() => dispatch(addToCart({ ...product, amount: 1 }))}
			>
				Add to cart
			</Button>
		</Container>
	)
}

export default ProductInfo
