import { Navigate } from "react-router-dom"

const PrivatePath = ({ component }: { component: JSX.Element }) => {
    if (localStorage.getItem("user")) {
        return component
    }
    return <Navigate to="/login" />
}

export default PrivatePath
