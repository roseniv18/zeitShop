import { Box, Typography, Button, MenuItem } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAppDispatch } from "../../redux/store"
import { removeCartItem } from "../../redux/slices/productSlice"
import { serverURL } from "../../helpers/serverURL"

type PropsType = {
	name: string
	img: string
	amount: number
	price: number
	id: string
}

const CartMenuItem = ({ name, img, amount, price, id }: PropsType) => {
	const dispatch = useAppDispatch()

	return (
		<MenuItem>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					gap: "18px",
					maxWidth: "360px",
				}}
			>
				<img
					src={`${serverURL}/images/${img}`}
					alt={name}
					className="cart-item-img"
				/>
				<Box sx={{ textAlign: "center" }}>
					<Typography
						fontWeight={600}
						variant="body2"
						sx={{ wordBreak: "break-word", whiteSpace: "pre-line" }}
					>
						{name}
					</Typography>
					<Typography sx={{ fontWeight: 400 }}>
						{amount} x €{price}
					</Typography>
				</Box>

				<Button onClick={() => dispatch(removeCartItem(id))}>
					<DeleteIcon />
				</Button>
			</Box>
		</MenuItem>
	)
}

export default CartMenuItem
