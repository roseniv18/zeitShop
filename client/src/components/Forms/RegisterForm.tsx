import { ChangeEvent, useEffect, useState } from "react"
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Box,
    Typography,
    Paper,
    InputAdornment,
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import EmailIcon from "@mui/icons-material/Email"
import KeyIcon from "@mui/icons-material/Key"

import { useAppDispatch, useAppSelector } from "../../redux/store"
import { NewUser } from "../../types/NewUser"
import { registerUser } from "../../redux/userSlice"

const RegisterForm = () => {
    const { user, alert } = useAppSelector((store) => store.user)
    const [newUser, setNewUser] = useState<NewUser>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setNewUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
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
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ my: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                onChange={handleChange}
                                value={newUser.firstName}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                onChange={handleChange}
                                value={newUser.lastName}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={handleChange}
                                value={newUser.email}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handleChange}
                                value={newUser.password}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <KeyIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox value="allowExtraEmails" color="primary" />
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
                            <Link
                                to="/login"
                                style={{ color: "inherit", textDecoration: "none" }}
                            >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Paper>
    )
}

export default RegisterForm
