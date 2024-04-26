import {
	Paper,
	List,
	ListItem,
	Divider,
	Container,
	Typography,
	Button,
} from "@mui/material"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { clearCart } from "../redux/slices/productSlice"
import axios from "axios"
import { ShippingDetails } from "../types/CheckoutTypes/ShippingDetails"
import { CheckoutError } from "../types/CheckoutTypes/CheckoutError"
import { useState } from "react"
import Spinner from "./Spinner"
import { serverURL } from "../helpers/serverURL"

const OrderTotal = ({
	setCheckoutError,
	shippingDetails,
	isCheckout,
}: {
	setCheckoutError: React.Dispatch<React.SetStateAction<CheckoutError>>
	shippingDetails: ShippingDetails
	isCheckout: boolean
}) => {
	const { user } = useAppSelector((store) => store.user)
	const { cart } = useAppSelector((store) => store.products)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { fullName, city, country, streetAddress, postalCode } =
		shippingDetails
	const dispatch = useAppDispatch()

	const subtotal: number = cart.reduce(
		(acc, curr) => acc + curr.price * curr.amount,
		0
	)
	const shipping_fee = 5.99
	let isError = false

	const defaultFlexStyling = {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	}

	const handleCheckout = async () => {
		setIsLoading(true)
		if (!fullName) {
			setCheckoutError((prev) => ({
				...prev,
				fullName: "Please provide your names",
			}))
			isError = true
		}
		if (!streetAddress) {
			setCheckoutError((prev) => ({
				...prev,
				streetAddress: "Please provide a street address",
			}))
			isError = true
		}
		if (!city) {
			setCheckoutError((prev) => ({
				...prev,
				city: "Please provide a city",
			}))
			isError = true
		}
		if (!country) {
			setCheckoutError((prev) => ({
				...prev,
				country: "Please provide a country",
			}))
			isError = true
		}
		if (!postalCode) {
			setCheckoutError((prev) => ({
				...prev,
				postalCode: "Please provide a postal code",
			}))
			isError = true
		}
		if (!isError) {
			try {
				const res = await axios.post(
					`${serverURL}/checkout/create-checkout-session`,
					{
						items: cart,
						userId: user._id,
					}
				)
				if (res.data.url) {
					window.location.href = res.data.url
				}
				setIsLoading(false)
			} catch (error) {
				console.log(error)
				setIsLoading(false)
			}
		}
		setIsLoading(false)
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<Container maxWidth="xs" sx={{ mb: 9 }}>
			<Paper>
				<Container sx={{ py: 3 }}>
					<List>
						<ListItem sx={{ px: 0, py: 0 }}>
							<Container sx={defaultFlexStyling} disableGutters>
								<Typography variant="h6">Subtotal: </Typography>
								<Typography variant="h6">
									€ {subtotal.toFixed(2)}{" "}
								</Typography>
							</Container>
						</ListItem>
						<ListItem sx={{ px: 0 }}>
							<Container sx={defaultFlexStyling} disableGutters>
								<Typography>Shipping fee: </Typography>
								<Typography>
									€ {shipping_fee.toFixed(2)}{" "}
								</Typography>
							</Container>
						</ListItem>
						<Divider sx={{ my: 3 }} />
						<ListItem sx={{ px: 0 }}>
							<Container sx={defaultFlexStyling} disableGutters>
								<Typography variant="h5">
									Order Total:{" "}
								</Typography>
								<Typography variant="h5">
									€ {(subtotal + shipping_fee).toFixed(2)}
								</Typography>
							</Container>
						</ListItem>
					</List>
					{isCheckout ? (
						<Container sx={defaultFlexStyling} disableGutters>
							<Button variant="outlined">
								<Link
									to="/cart"
									style={{
										color: "inherit",
										textDecoration: "none",
									}}
								>
									Back to cart
								</Link>
							</Button>

							<Button
								onClick={handleCheckout}
								variant="contained"
							>
								Order
							</Button>
						</Container>
					) : (
						<Container sx={defaultFlexStyling} disableGutters>
							<Button
								variant="outlined"
								color="error"
								onClick={() => dispatch(clearCart())}
							>
								Clear cart
							</Button>
							<Button variant="contained">
								<Link
									to="/checkout"
									style={{
										color: "inherit",
										textDecoration: "none",
									}}
								>
									Proceed to checkout
								</Link>
							</Button>
						</Container>
					)}
				</Container>
			</Paper>
		</Container>
	)
}

export default OrderTotal
