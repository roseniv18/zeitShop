import { Typography, Button, Paper } from "@mui/material"
import { useAppDispatch } from "../../../redux/store"
import { removeFromWishlist } from "../../../redux/slices/userSlice"
import { serverURL } from "../../../helpers/serverURL"
import { Link } from "react-router-dom"

type PropTypes = {
	item: {
		productName: string
		image: string
		productId: string
	}

	userId: string
}

const WishlistItem = ({ item, userId }: PropTypes) => {
	const dispatch = useAppDispatch()

	return (
		<Paper
			elevation={3}
			sx={{
				p: 2,
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				width: "100%",
			}}
		>
			<img
				src={`${serverURL}/images/${item.image}`}
				alt={item.productName}
				style={{ maxHeight: "60px" }}
			/>
			<Typography
				sx={{
					"&: hover": {
						color: "primary.main",
						transition: ".18s linear",
					},
				}}
			>
				<Link
					to=""
					style={{
						color: "inherit",
						textDecoration: "none",
						transition: ".18s linear",
						fontWeight: 500,
					}}
				>
					{item.productName}
				</Link>
			</Typography>
			<Button
				onClick={() =>
					dispatch(
						removeFromWishlist({
							_id: userId,
							productId: item.productId,
						})
					)
				}
			>
				Remove
			</Button>
		</Paper>
	)
}

export default WishlistItem
