import { Input } from "../../../types/Input"
import EmailIcon from "@mui/icons-material/Email"
import KeyIcon from "@mui/icons-material/Key"

export const loginInputs: Input[] = [
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
]
