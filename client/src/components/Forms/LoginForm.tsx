import { useState, ChangeEvent, useEffect } from "react"
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Paper,
    InputAdornment,
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { NewUser } from "../../types/NewUser"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { loginUser } from "../../redux/userSlice"
import EmailIcon from "@mui/icons-material/Email"
import KeyIcon from "@mui/icons-material/Key"

const LoginForm = () => {
    const { user, alert } = useAppSelector((store) => store.user)
    const [userData, setUserData] = useState<Partial<NewUser>>({
        email: "",
        password: "",
    })
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setUserData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(loginUser(userData))
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
                    Login
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ my: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onChange={handleChange}
                                value={userData.email}
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
                                onChange={handleChange}
                                value={userData.password}
                                id="password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <KeyIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link
                                to="/register"
                                style={{ color: "inherit", textDecoration: "none" }}
                            >
                                Don't have an account? Sign up here.
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Paper>
    )
}

export default LoginForm
