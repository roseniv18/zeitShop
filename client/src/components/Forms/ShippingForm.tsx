import { Container, Box, TextField, FormControl, Typography } from "@mui/material"
import { ChangeEvent } from "react"
import { formFields } from "../../helpers/formFields"
import { FormFields } from "../../types/CheckoutTypes/Form"

type Props = {
	checkoutError: FormFields
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	shippingDetails: FormFields
}

// Helper style object.
const defaultFlexStylesCol = {
	display: "flex",
	flexDirection: "column",
	py: 3,
	gap: 3,
}

const ShippingForm = ({ checkoutError, onChange, shippingDetails }: Props) => {
	return (
		<Container sx={defaultFlexStylesCol} maxWidth="xs">
			<Box
				component="form"
				noValidate
				onSubmit={(e) => e.preventDefault()} // Prevent page from reloading on submit.
				sx={defaultFlexStylesCol}
			>
				<Typography variant="h4">Shipping Details</Typography>

				{/*
					Map over each formfield and return a text field with dynamic props.
					formFields are defined in helpers/formFields.ts
				*/}
				{formFields.map((formField) => {
					// Destructure formField object
					const { fieldName, label, id } = formField
					/*
						"as keyof typeof" ShippingForm tells TS that the type of the 
						object key we are passing belongs to ShippingForm.
					*/
					const error: string = checkoutError[fieldName as keyof typeof ShippingForm]
					const defaultValue: string =
						shippingDetails[fieldName as keyof typeof ShippingForm] || ""
					return (
						<FormControl fullWidth variant="filled">
							<TextField
								required
								fullWidth
								error={Boolean(error)}
								helperText={error}
								id={id}
								label={label}
								name={fieldName}
								defaultValue={defaultValue}
								autoComplete={id}
								onChange={onChange}
							/>
						</FormControl>
					)
				})}
			</Box>
		</Container>
	)
}

export default ShippingForm
