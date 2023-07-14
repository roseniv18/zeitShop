import express from "express"
import { getProduct, getProducts } from "../controllers/productController"
const router = express.Router()

router.route("/").get(getProducts)
router.route("/:nameId").get(getProduct)

export default router
