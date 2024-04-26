import express from "express"
import { getTest } from "../controllers/testController"

const router = express.Router()

router.post("/register", getTest)

export default router
