const asyncHandler = require("express-async-handler")
import { Request, Response } from "express"
import Product from "../models/productModel"
import { initFilters } from "../helpers/initFilters"
import {
	GetProductParams,
	GetProductsQuery,
	GetSearchProductsQuery,
} from "../types/ProductReqTypes"

// Gets products on initial load and subsequent filtering
const getProducts = asyncHandler(
	async (req: Request<{}, {}, {}, GetProductsQuery>, res: Response) => {
		let products
		// Default sort options
		let sortBy: string = "fullName"
		// Mongoose uses 1 for ascending and -1 for descending sort order
		let sortOrder: number = 1

		if (req.query.sortBy && req.query.sortOrder) {
			sortBy = req.query.sortBy
			sortOrder = req.query.sortOrder
		}

		// Handle pagination
		const page: number = req.query.page || 1
		const limit: number = 9
		const skip: number = (page - 1) * limit

		// Initialize filters
		const filters = initFilters(req.query)

		// Initialize query based on given filters
		const query = filters.price
			? {
					...filters,
					price: { $gte: filters.price[0], $lte: filters.price[1] },
			  }
			: { ...filters }

		// If no filters are given
		if (!Object.keys(req.query)[0]) {
			try {
				products = await Product.find().skip(skip).limit(limit)
			} catch (error) {
				res.status(500).send({ message: "No products found!" })
			}
		}

		// Find total number of products
		const totalCount = await Product.count(query)

		// If there are filters but no search query
		if (!req.query.search && Object.keys(req.query)) {
			try {
				products = await Product.find(query)
					.sort({ [sortBy]: sortOrder as any })
					.skip(skip)
					.limit(limit)
			} catch (error) {
				res.status(500).send({ message: "Something went wrong" })
			}

			if (products && products.length > 0) {
				res.status(200).send({ products, totalCount })
			}
			res.status(404).send({ message: "No products found" })
		}
	}
)

// Handles search queries from the search bar.
const getSearchProducts = asyncHandler(
	async (req: Request<{}, {}, {}, GetSearchProductsQuery>, res: Response) => {
		// First, we decode the search query
		const search: string = decodeURI(req.query.search as string)
		/* 
			Initialize a regex variable - only alphanumerical values
		 	with hyphens will be valid 
		*/
		const regex: RegExp = new RegExp("^[a-zA-Z0-9- ]*$")
		let products

		// Test the search query string and attempt to find matching products in DB
		if (regex.test(search)) {
			if (req.query.search) {
				products = await Product.find({
					fullName: { $regex: search, $options: "i" },
				})
			} else {
				products = await Product.find({})
			}
			if (products.length === 0) {
				res.status(404).send({
					message: "No products found",
					query: search,
				})
			}
			res.status(200).json(products)
		} else {
			res.status(400).send({ message: "Invalid query" })
		}
	}
)

const getProduct = asyncHandler(
	async (req: Request<GetProductParams>, res: Response) => {
		if (!req.params.nameId) {
			res.status(400).json({ message: "Please provide an id!" })
		}
		// Check if valid id
		const product = await Product.findOne({
			nameId: req.params.nameId,
		}).exec()
		if (!product) {
			res.status(404).json({ message: "No such product found!" })
		}
		res.status(200).json(product)
	}
)

export { getProduct, getProducts, getSearchProducts }
