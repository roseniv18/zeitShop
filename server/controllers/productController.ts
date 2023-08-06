const asyncHandler = require("express-async-handler")
import { Request, Response } from "express"
import Product from "../models/productModel"
import { initFilters } from "../helpers/initFilters"

const getProducts = asyncHandler(async (req: Request, res: Response) => {
    let products

    console.log(Object.keys(req.query))

    // If no filters are given
    if (!Object.keys(req.query)[0]) {
        try {
            products = await Product.find()
        } catch (error) {
            res.status(500).send({ message: "No products found!" })
        }
    }

    // If there are filters but no search query
    if (!req.query.search && Object.keys(req.query)) {
        const filters = initFilters(req.query)

        if (filters.price) {
            try {
                products = await Product.find({
                    ...filters,
                    price: { $gte: filters.price[0], $lte: filters.price[1] },
                })
            } catch (error) {
                res.status(500).send({ message: "Something went wrong" })
            }
        } else {
            try {
                products = await Product.find({
                    ...filters,
                })
            } catch (error) {
                res.status(500).send({ message: "Something went wrong" })
            }
        }

        if (products) {
            res.status(200).send(products)
        }
        res.status(404).send({ message: "No product found" })
    }
})

const getSearchProducts = asyncHandler(async (req: Request, res: Response) => {
    const search: string = decodeURI(req.query.search as string)
    const regex: RegExp = new RegExp("^[a-zA-Z0-9- ]*$")
    let products

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

export { getProduct, getProducts, getSearchProducts }
