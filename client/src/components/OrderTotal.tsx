import { Paper, List, ListItem, Divider, Container, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { clearCart } from "../redux/slices/productSlice"
import axios from "axios"
import { useState } from "react"
import Spinner from "./Spinner"
import { serverURL } from "../helpers/serverURL"
import { FormFields } from "../types/CheckoutTypes/Form"

const OrderTotal = ({
	setCheckoutError,
	shippingDetails,
	isCheckout,
}: {
	setCheckoutError: React.Dispatch<React.SetStateAction<FormFields>>
	shippingDetails: FormFields
	isCheckout: boolean
}) => {
	const { user } = useAppSelector((store) => store.user)
	const { cart } = useAppSelector((store) => store.products)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)
	const dispatch = useAppDispatch()

	const subtotal: number = cart.reduce((acc, curr) => acc + curr.price * curr.amount, 0)
	const shipping_fee = 5.99

	// Helper style object
	const defaultFlexStyling = {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	}

	// Handle checkout error for given field and error message
	const handleCheckoutError = (field: string, error: string) => {
		setCheckoutError((prev: FormFields) => ({
			...prev,
			[field]: error,
		}))
		setIsError(true)
	}

	// Given shippingDetails form values, check for possible empty values
	const checkShippingDetailsErrors = (shippingDetails: FormFields): void => {
		const fieldsToCheck = {
			fullName: "Please provide your names",
			streetAddress: "Please provide a street address",
			city: "Please provide a city",
			country: "Please provide a country",
			postalCode: "Please provide a postal code",
		}

		Object.entries(fieldsToCheck).forEach(([field, message]) => {
			if (!shippingDetails[field as keyof typeof shippingDetails]) {
				handleCheckoutError(field, message)
			}
		})
	}

	const handleCheckout = async () => {
		setIsLoading(true)
		checkShippingDetailsErrors(shippingDetails)
		if (!isError) {
			try {
				const res = await axios.post(`${serverURL}/checkout/create-checkout-session`, {
					items: cart,
					userId: user._id,
				})
				// Navigate to checkout session url
				if (res.data.url) {
					window.location.href = res.data.url
				}
				setIsLoading(false)
			} catch (error) {
				console.error(error)
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
								<Typography variant="h6">€ {subtotal.toFixed(2)} </Typography>
							</Container>
						</ListItem>
						<ListItem sx={{ px: 0 }}>
							<Container sx={defaultFlexStyling} disableGutters>
								<Typography>Shipping fee: </Typography>
								<Typography>€ {shipping_fee.toFixed(2)} </Typography>
							</Container>
						</ListItem>
						<Divider sx={{ my: 3 }} />
						<ListItem sx={{ px: 0 }}>
							<Container sx={defaultFlexStyling} disableGutters>
								<Typography variant="h5">Order Total: </Typography>
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

							<Button onClick={handleCheckout} variant="contained">
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
