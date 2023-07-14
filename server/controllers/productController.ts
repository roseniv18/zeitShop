const asyncHandler = require("express-async-handler")
import { Request, Response } from "express"
import Product from "../models/productModel"

const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find({})
    if (products.length === 0) {
        res.json({ message: "No products found" })
    }
    res.status(200).json(products)
})

export { getProducts }
