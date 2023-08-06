import express from "express"
import {
    getProduct,
    getProducts,
    getSearchProducts,
} from "../controllers/productController"
const router = express.Router()

router.get("/", getProducts)
router.get("/getProduct/:nameId", getProduct)
router.get("/getSearchProducts", getSearchProducts)

export default router
