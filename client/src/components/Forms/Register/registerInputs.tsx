import { Input } from "../../../types/Input"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import EmailIcon from "@mui/icons-material/Email"
import KeyIcon from "@mui/icons-material/Key"

export const registerInputs: Input[] = [
    {
        name: "firstName",
        type: "text",
        id: "firstName",
        label: "First Name",
        value: "firstName",
        icon: <AccountCircleIcon />,
    },

    {
        name: "lastName",
        type: "text",
        id: "lastName",
        label: "Last Name",
        value: "lastName",
        icon: <AccountCircleIcon />,
    },

    {
        name: "email",
        type: "email",
        id: "email",
        label: "Email",
        value: "email",
        icon: <EmailIcon />,
    },

    {
        name: "password",
        type: "password",
        id: "password",
        label: "Password",
        value: "password",
        icon: <KeyIcon />,
    },

    {
        name: "confirmPassword",
        type: "password",
        id: "confirmPassword",
        label: "Confirm Password",
        value: "confirmPassword",
        icon: <KeyIcon />,
    },
]
