import { ChangeEvent, useState } from "react"
import { Container, Paper } from "@mui/material"
import { ShippingDetails } from "../types/ShippingDetails"
import OrderTotal from "../components/OrderTotal"
import ShippingForm from "../components/Forms/ShippingForm"
import { useAppSelector } from "../redux/store"
import { CheckoutError } from "../types/CheckoutError"

const Checkout = () => {
    const { user } = useAppSelector((store) => store.user)
    const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
        fullName: user.firstName + " " + user.lastName,
        streetAddress: user.address.street,
        country: user.address.country,
        city: user.address.city,
        postalCode: user.address.postal_code,
    })
    const [checkoutError, setCheckoutError] = useState<CheckoutError>({
        fullName: "",
        streetAddress: "",
        country: "",
        city: "",
        postalCode: "",
    })

    const defaultFlexStylesCol = {
        display: "flex",
        flexDirection: "column",
        py: 3,
        gap: 3,
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCheckoutError((prev) => ({ ...prev, [name]: "" }))
        setShippingDetails((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <Container sx={{ my: 9 }} disableGutters>
            <Paper
                elevation={3}
                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
                <Container
                    disableGutters
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: "center",
                        justifyContent: "space-between",
                        py: 3,
                        gap: 3,
                    }}
                >
                    <Container disableGutters sx={defaultFlexStylesCol}>
                        <ShippingForm
                            checkoutError={checkoutError}
                            onChange={handleChange}
                            shippingDetails={shippingDetails}
                        />
                    </Container>
                    <Container disableGutters sx={defaultFlexStylesCol}>
                        <OrderTotal
                            setCheckoutError={setCheckoutError}
                            shippingDetails={shippingDetails}
                            isCheckout={true}
                        />
                    </Container>
                </Container>
            </Paper>
        </Container>
    )
}

export default Checkout
