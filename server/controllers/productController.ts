const asyncHandler = require("express-async-handler")
import { Request, Response } from "express"
import Product from "../models/productModel"

const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const search: string = decodeURI(req.query.search as string)
    const regex: RegExp = new RegExp("^[a-zA-Z0-9- ]*$")
    let products = []

    if (regex.test(search)) {
        if (req.query.search) {
            products = await Product.find({ fullName: { $regex: search, $options: "i" } })
        } else {
            products = await Product.find({})
        }
        if (products.length === 0) {
            res.status(404).send({ message: "No products found", query: search })
        }
        res.status(200).json(products)
    } else {
        res.status(400).send({ message: "Invalid query" })
    }
})

const getProduct = asyncHandler(async (req: Request, res: Response) => {
    if (!req.params.nameId) {
        res.status(400).json({ message: "Please provide an id!" })
    }
    // Check if valid id
    const product = await Product.findOne({ nameId: req.params.nameId }).exec()
    if (!product) {
        res.status(404).json({ message: "No such product found!" })
    }
    res.status(200).json(product)
})

export { getProduct, getProducts }
