import express from "express"
import { registerUser, loginUser, updateContactInfo } from "../controllers/userController"
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.patch("/updateContactInfo", updateContactInfo)

export default router
