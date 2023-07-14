import express from "express"
import { getProducts } from "../controllers/productController"
const router = express.Router()

router.route("/").get(getProducts)
router.route("/:nameId").get()

export default router
