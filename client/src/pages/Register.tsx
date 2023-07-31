import { useEffect } from "react"
import RegisterForm from "../components/Forms/RegisterForm"
import { Container } from "@mui/material"
import { useAppSelector } from "../redux/store"
import { useNavigate } from "react-router"

const Register = () => {
    const { user } = useAppSelector((store) => store.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user && user.token) {
            navigate("/products")
        }
    }, [])

    return (
        <Container maxWidth="xs" sx={{ marginTop: 3 }}>
            <RegisterForm />
        </Container>
    )
}

export default Register
