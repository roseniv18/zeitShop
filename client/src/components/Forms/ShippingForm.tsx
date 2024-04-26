import {
	Container,
	Box,
	TextField,
	FormControl,
	Typography,
} from "@mui/material"
import { ChangeEvent } from "react"
import { ShippingDetails } from "../../types/CheckoutTypes/ShippingDetails"
import { CheckoutError } from "../../types/CheckoutTypes/CheckoutError"

const ShippingForm = ({
	checkoutError,
	onChange,
	shippingDetails,
}: {
	checkoutError: CheckoutError
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	shippingDetails: ShippingDetails
}) => {
	const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	const defaultFlexStylesCol = {
		display: "flex",
		flexDirection: "column",
		py: 3,
		gap: 3,
	}

	return (
		<Container sx={defaultFlexStylesCol} maxWidth="xs">
			<Box
				component="form"
				noValidate
				onSubmit={handleSubmit}
				sx={defaultFlexStylesCol}
			>
				<Typography variant="h4">Shipping Details</Typography>
				<FormControl fullWidth variant="filled">
					<TextField
						required
						fullWidth
						error={Boolean(checkoutError.fullName)}
						helperText={checkoutError.fullName}
						id="full-name"
						label="Full Name"
						name="fullName"
						defaultValue={shippingDetails.fullName || ""}
						autoComplete="full-name"
						onChange={onChange}
					/>
				</FormControl>
				<FormControl fullWidth variant="filled">
					<TextField
						required
						fullWidth
						error={Boolean(checkoutError.streetAddress)}
						helperText={checkoutError.streetAddress}
						id="street-address"
						label="Street Address"
						name="streetAddress"
						defaultValue={shippingDetails.streetAddress || ""}
						autoComplete="street-address"
						onChange={onChange}
					/>
				</FormControl>
				<FormControl fullWidth variant="filled">
					<TextField
						required
						fullWidth
						error={Boolean(checkoutError.country)}
						helperText={checkoutError.country}
						id="country"
						label="Country"
						name="country"
						defaultValue={shippingDetails.country || ""}
						autoComplete="country"
						onChange={onChange}
					/>
				</FormControl>
				<FormControl fullWidth variant="filled">
					<TextField
						required
						fullWidth
						error={Boolean(checkoutError.city)}
						helperText={checkoutError.city}
						id="city"
						label="City"
						name="city"
						defaultValue={shippingDetails.city || ""}
						autoComplete="city"
						onChange={onChange}
					/>
				</FormControl>
				<FormControl fullWidth variant="filled">
					<TextField
						required
						fullWidth
						error={Boolean(checkoutError.postalCode)}
						helperText={checkoutError.postalCode}
						id="postal-code"
						label="Postal Code"
						name="postalCode"
						defaultValue={shippingDetails.postalCode || ""}
						autoComplete="postal-code"
						onChange={onChange}
					/>
				</FormControl>
			</Box>
		</Container>
	)
}

export default ShippingForm
