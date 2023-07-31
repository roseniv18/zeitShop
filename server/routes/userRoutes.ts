import express from "express"
import {
    registerUser,
    loginUser,
    updateContactInfo,
    addToWishlist,
    removeFromWishlist,
} from "../controllers/userController"
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.patch("/updateContactInfo", updateContactInfo)
router
    .post("/addToWishlist", addToWishlist)
    .delete("/removeFromWishlist", removeFromWishlist)

export default router
