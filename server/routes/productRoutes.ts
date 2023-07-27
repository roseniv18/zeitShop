import express from "express"
import {
    getFilteredProducts,
    getProduct,
    getProducts,
} from "../controllers/productController"
const router = express.Router()

router.get("/", getProducts)
router.get("/getProduct/:nameId", getProduct)
router.get("/getFilteredProducts", getFilteredProducts)

export default router
