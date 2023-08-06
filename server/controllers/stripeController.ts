const asyncHandler = require("express-async-handler")
const dotenv = require("dotenv").config()
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_TEST_KEY)
import { serverURL } from "../helpers/serverURL"
import { CartProduct } from "../types/CartProduct"
import { Request, Response } from "express"

const createCheckoutSession = asyncHandler(async (req: Request, res: Response) => {
    const { items, userId }: { items: CartProduct[]; userId: string } = req.body
    const line_items = items.map((item: CartProduct) => {
        const fullName: string =
            `${item.brand} ${item.model} ${item.model_info}`.toLocaleUpperCase()
        console.log(serverURL)
        return {
            price_data: {
                currency: "eur",
                product_data: {
                    name: fullName,
                    description: `${item.mechanism} ${item.dial_color} ${item.case_diameter} ${item.case_material}`,
                    images: item.image_urls.map((img) => `${serverURL}/${img}`),
                    metadata: {
                        id: item.article_number,
                        // ... client info
                    },
                },
                unit_amount: item.price * 100,
            },
            quantity: item.amount,
        }
    })
    if (!userId) {
        res.status(401).send({ message: "Not authorized!" })
    }

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
    })

    res.send({ url: session.url })
})

export { createCheckoutSession }
