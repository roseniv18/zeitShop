import LoginForm from "../components/Forms/LoginForm"
import { Container } from "@mui/material"
import { useAppSelector } from "../redux/store"
import { useEffect } from "react"
import { useNavigate } from "react-router"

const Login = () => {
    const { user } = useAppSelector((store) => store.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user && user.token) {
            navigate("/products")
        }
    }, [user])

    return (
        <Container maxWidth="xs" sx={{ marginTop: 3 }}>
            <LoginForm />
        </Container>
    )
}

export default Login
