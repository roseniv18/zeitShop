import { ChangeEvent } from "react"
import { TextField, InputAdornment } from "@mui/material"

type PropsType = {
    name: string
    type: "text" | "email" | "password"
    id: string
    label: string
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
    icon: JSX.Element
    isError: boolean
}

const FormInput = ({
    name,
    type,
    id,
    label,
    handleChange,
    value,
    icon,
    isError,
}: PropsType) => {
    return (
        <TextField
            name={name}
            type={type}
            required
            fullWidth
            id={id}
            label={label}
            onChange={handleChange}
            value={value}
            InputProps={{
                startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
            }}
            error={isError}
        />
    )
}

export default FormInput
