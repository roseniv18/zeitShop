import { useState, ChangeEvent, useEffect } from "react"
import { Avatar, Button, CssBaseline, Grid, Box, Typography, Paper } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useAppDispatch, useAppSelector } from "../../../redux/store"
import { loginUser } from "../../../redux/userSlice"
import { loginInputs } from "./loginInputs"
import FormInput from "../FormInput"

type UserData = {
    email: string
    password: string
}

const LoginForm = () => {
    const { user, alert } = useAppSelector((store) => store.user)
    const [userData, setUserData] = useState<UserData>({
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
                        {loginInputs.map((input) => {
                            const { value } = input
                            return (
                                <Grid item xs={12}>
                                    <FormInput
                                        {...input}
                                        value={userData[value as keyof typeof userData]}
                                        handleChange={handleChange}
                                    />
                                </Grid>
                            )
                        })}
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
                            <Typography sx={{ float: "left" }}>
                                Don't have an account?&nbsp;
                            </Typography>
                            <Link
                                to="/register"
                                style={{ color: "primary.main", textDecoration: "none" }}
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
                                    Sign up here.
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Paper>
    )
}

export default LoginForm
