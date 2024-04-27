import { Box, Typography, Container, Button, Rating } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { deleteReview } from "../../../redux/thunks/thunksExport"
import { serverURL } from "../../../helpers/serverURL"

const Reviews = ({ drawerWidth }: { drawerWidth: number }) => {
	const { user } = useAppSelector((store) => store.user)
	const { reviews } = user
	const dispatch = useAppDispatch()

	return (
		<Box
			component="main"
			sx={{
				bgcolor: "transparent",
				py: 6,
				px: { xs: 3, md: 10 },
				width: `calc(100%- ${drawerWidth}px)`,
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography variant="h3" sx={{ mb: 3 }}>
					Your Reviews
				</Typography>
				{reviews && reviews.length > 0 ? (
					reviews.map((review) => {
						return (
							<Container
								key={review.productId}
								sx={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<img
									src={`${serverURL}/images/${review.image}`}
									alt={review.productName}
									className="cart-item-img"
								/>
								<Container
									sx={{
										display: "flex",
										flexDirection: "column",
									}}
								>
									<Typography variant="h6">
										{review.productName}
									</Typography>
									<Typography variant="h5">
										{review.comment}
									</Typography>
									<Rating value={review.rating} readOnly />
								</Container>
								<Button
									onClick={() =>
										dispatch(
											deleteReview({
												_id: user._id,
												productId: review.productId,
											})
										)
									}
								>
									Delete review
								</Button>
							</Container>
						)
					})
				) : (
					<Typography variant="h2">
						You have no reviews yet.
					</Typography>
				)}
			</Box>
		</Box>
	)
}

export default Reviews
