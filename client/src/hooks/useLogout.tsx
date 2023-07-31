import { useAppDispatch } from "../redux/store"
import { useNavigate } from "react-router"
import { logout } from "../redux/userSlice"

const useLogout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    return () => {
        dispatch(logout())
        navigate(-1)
    }
}

export default useLogout
