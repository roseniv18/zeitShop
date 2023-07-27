const asyncHandler = require("express-async-handler")
import { Request, Response } from "express"
import Product from "../models/productModel"
import { Filters } from "../types/Filters"

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

const getFilteredProducts = asyncHandler(async (req: Request, res: Response) => {
    const filters: any = {}

    if (req.query.brand && typeof req.query.brand === "string") {
        filters.brand = req.query.brand.split(",")
    }

    if (req.query.dial_color && typeof req.query.dial_color === "string") {
        filters.dial_color = req.query.dial_color.split(",")
    }

    if (req.query.case_material && typeof req.query.case_material === "string") {
        filters.case_material = req.query.case_material.split(",")
    }

    if (req.query.band_material && typeof req.query.band_material === "string") {
        filters.band_material = req.query.band_material.split(",")
    }

    if (req.query.mechanism && typeof req.query.mechanism === "string") {
        filters.mechanism = req.query.mechanism.split(",")
    }

    if (req.query.price && typeof req.query.price === "string") {
        const temp: string[] = req.query.price.split(",")
        filters.price = [parseInt(temp[0]), parseInt(temp[1])]
    }

    let products

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
        console.log(filters)
        res.status(200).send(products)
    }
    res.status(404).send({ message: "No product found" })
})

export { getProduct, getProducts, getFilteredProducts }
