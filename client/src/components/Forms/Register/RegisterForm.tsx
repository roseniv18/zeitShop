import { ChangeEvent, useEffect, useState } from "react"
import {
	Avatar,
	Button,
	CssBaseline,
	FormControlLabel,
	Checkbox,
	Grid,
	Box,
	Typography,
	Paper,
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { NewUser } from "../../../types/UserTypes/NewUser"
import { registerUser, setUserAlert } from "../../../redux/slices/userSlice"
import FormInput from "../FormInput"
import { registerInputs } from "./registerInputs"

const RegisterForm = () => {
	const { user, alert } = useAppSelector((store) => store.user)
	const [newUser, setNewUser] = useState<NewUser>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	})
	const [errorFields, setErrorFields] = useState<string[]>([""])
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const checkForErrorFields = (fields: NewUser) => {
		return Object.keys(fields).filter(
			(field) => !fields[field as keyof typeof fields]
		)
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		setNewUser((prev) => ({ ...prev, [name]: value }))
		// Remove error when starting to type
		if (value && errorFields.includes(name)) {
			setErrorFields((prev) =>
				prev.filter((errField) => errField !== name)
			)
		}
	}

	const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (newUser.password !== newUser.confirmPassword) {
			setUserAlert({
				type: "error",
				show: true,
				msg: "Passwords do not match!",
			})
			return
		}
		setErrorFields(checkForErrorFields(newUser))
		dispatch(registerUser(newUser))
	}

	useEffect(() => {
		if (user._id && alert.type !== "error") {
			navigate("/products")
		}
	}, [user])

	return (
		<Paper sx={{ px: 4, py: 3 }}>
			<CssBaseline />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box
					component="form"
					noValidate
					onSubmit={handleSubmit}
					sx={{ my: 3 }}
				>
					<Grid container spacing={2}>
						{registerInputs.map((input) => {
							const { name, value } = input
							const gridSize: number =
								name === "firstName" || name === "lastName"
									? 6
									: 12
							return (
								<Grid item xs={12} md={gridSize}>
									<FormInput
										{...input}
										value={
											newUser[
												value as keyof typeof newUser
											]
										}
										isError={errorFields.includes(name)}
										handleChange={handleChange}
									/>
								</Grid>
							)
						})}
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox
										value="allowExtraEmails"
										color="primary"
									/>
								}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="center">
						<Grid item>
							<Typography sx={{ float: "left" }}>
								Already have an account?&nbsp;
							</Typography>
							<Link
								to="/login"
								style={{
									color: "primary.main",
									textDecoration: "none",
								}}
							>
								<Typography
									variant="body1"
									sx={{
										float: "right",
										textDecoration: "underline",
										transition: ".18s linear",
										"&:hover": {
											color: "secondary.main",
											transition: ".18s linear",
										},
									}}
								>
									Sign in.
								</Typography>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Paper>
	)
}

export default RegisterForm
