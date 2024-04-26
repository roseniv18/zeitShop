import { Box, Grid, TextField, Button, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { ChangeEvent, useState } from "react"
import { updateContactInfo } from "../../redux/slices/userSlice"

type UserInfo = {
	firstName: string
	lastName: string
	country: string
	city: string
	street: string
	phone: string
}

const PersonalInfo = ({ drawerWidth }: { drawerWidth: number }) => {
	const { user } = useAppSelector((store) => store.user)
	const [userInfo, setUserInfo] = useState<UserInfo>({
		firstName: user.firstName || "",
		lastName: user.lastName || "",
		country: user.address.country || "",
		city: user.address.city || "",
		street: user.address.street || "",
		phone: user.address.phone || "",
	})
	const dispatch = useAppDispatch()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUserInfo((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()

		dispatch(updateContactInfo({ _id: user._id, userInfo }))
	}

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
					Contact Details
				</Typography>
				<Box
					component="form"
					noValidate
					sx={{ my: 3 }}
					onSubmit={handleSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="given-name"
								name="firstName"
								required
								fullWidth
								id="firstName"
								label="First Name"
								value={userInfo.firstName}
								onChange={handleChange}
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								value={userInfo.lastName}
								onChange={handleChange}
								autoComplete="family-name"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="country"
								label="Country"
								name="country"
								value={userInfo.country}
								onChange={handleChange}
								autoComplete="country"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="city"
								label="City"
								name="city"
								value={userInfo.city}
								onChange={handleChange}
								autoComplete="city"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="street"
								label="Street"
								name="street"
								value={userInfo.street}
								onChange={handleChange}
								autoComplete="street"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="phone"
								label="Phone Number"
								name="phone"
								value={userInfo.phone}
								onChange={handleChange}
								autoComplete="phone"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth={false}
						size="medium"
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Save
					</Button>
				</Box>
			</Box>
		</Box>
	)
}

export default PersonalInfo
